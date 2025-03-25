"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bibleService } from "../../../services/bibleService";
import { Book } from "../../../types/bible";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function OldTestamentBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  function determineTestament(abbrev: string): "old" | "new" {
    const oldTestamentAbbrevs = [
      "gn",
      "ex",
      "lv",
      "nm",
      "dt",
      "js",
      "jz",
      "rt",
      "1sm",
      "2sm",
      "1rs",
      "2rs",
      "1cr",
      "2cr",
      "ed",
      "ne",
      "et",
      "jó",
      "sl",
      "pv",
      "ec",
      "ct",
      "is",
      "jr",
      "lm",
      "ez",
      "dn",
      "os",
      "jl",
      "am",
      "ob",
      "jn",
      "mq",
      "na",
      "hc",
      "sf",
      "ag",
      "zc",
      "ml",
    ];
    return oldTestamentAbbrevs.includes(abbrev) ? "old" : "new";
  }

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await bibleService.getBooks();
        if (Array.isArray(data)) {
          // Adiciona o atributo 'testament' com base na lógica
          const booksWithTestament = data.map((book) => ({
            ...book,
            testament: determineTestament(book.abbrev),
          }));
          // Filtra apenas livros do Antigo Testamento
          const oldTestamentBooks = booksWithTestament.filter(
            (book) => book.testament === "old"
          );
          setBooks(oldTestamentBooks);
        } else {
          console.error("Dados recebidos não são um array:", data);
          setBooks([]);
          setError("Formato de dados inesperado. Por favor, tente novamente.");
        }
      } catch (err) {
        console.error("Erro ao carregar livros:", err);
        setError(
          "Falha ao carregar os livros da Bíblia. Tente novamente mais tarde."
        );
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="max-w-4xl mx-auto py-6">
        <div className="flex items-center mb-6">
          <Link
            href="/bible"
            className="flex items-center text-gray-500 hover:text-gray-700 mr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Voltar</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Antigo Testamento
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {books.map((book) => (
              <Link
                key={book.abbrev}
                href={`/bible/${book.abbrev}/1`}
                className="p-4 bg-white rounded-md border border-gray-200 hover:border-amber-500 hover:shadow transition-all flex flex-col"
              >
                <span className="font-medium text-lg mb-1">{book.name}</span>
                <span className="text-sm text-gray-500">
                  {book.chapters} capítulos
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
