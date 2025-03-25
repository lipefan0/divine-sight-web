"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bibleService } from "../../../services/bibleService";
import { Book } from "../../../types/bible";
import ProtectedRoute from "../../../components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { BsArrowLeft } from "react-icons/bs";

export default function NewTestamentBooks() {
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
          // Filtra apenas livros do Novo Testamento
          const newTestamentBooks = booksWithTestament.filter(
            (book) => book.testament === "new"
          );
          setBooks(newTestamentBooks);
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
      <div className="bg-primary rounded-t-[60px] h-[calc(100%-74px)]">
        <div className="max-w-4xl mx-auto py-6">
          <div className="flex flex-col mb-6">
            <Link
              href="/bible"
              className="flex items-center text-gray-500 hover:text-gray-700 ml-4"
            >
              <BsArrowLeft className="text-white" />
              <span className="text-white inline-block ml-2">Voltar</span>
            </Link>
            <h1 className="text-3xl font-bold text-white text-center">
              Novo Testamento
            </h1>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid grid-cols-3 ld:grid-cols-5 gap-2">
              {books.map((book) => (
                <Link
                  key={book.abbrev}
                  href={`/bible/${book.abbrev}/1`}
                  className="p-2 transition-all flex flex-col text-white items-center"
                >
                  <Image
                    src={`/livro.png`}
                    width={100}
                    height={100}
                    alt={`livro ${book.name}`}
                  />
                  <span className="font-medium text-sm my-1">{book.name}</span>
                  <span className="text-sm">{book.chapters} capítulos</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
