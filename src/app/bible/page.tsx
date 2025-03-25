"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bibleService } from "../../services/bibleService";
import { Book } from "../../types/bible";
import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function BibleBooks() {
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
        console.log("Livros carregados:", data);
        if (Array.isArray(data)) {
          // Adiciona o atributo 'testament' com base na lógica
          const booksWithTestament = data.map((book) => ({
            ...book,
            testament: determineTestament(book.abbrev),
          }));
          setBooks(booksWithTestament);
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

  const oldTestamentBooks = books.filter((book) => book.testament === "old");
  const newTestamentBooks = books.filter((book) => book.testament === "new");

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="max-w-4xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Livros da Bíblia
        </h1>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Antigo Testamento
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {oldTestamentBooks.map((book) => (
                  <Link
                    key={book.abbrev}
                    href={`/bible/${book.abbrev}/1`}
                    className="p-3 bg-white rounded-md border border-gray-200 hover:border-purple-300 hover:shadow transition-all flex justify-between items-center"
                  >
                    <span className="font-medium">{book.name}</span>
                    <span className="text-sm text-gray-500">
                      {book.chapters} cap.
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Novo Testamento
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {newTestamentBooks.map((book) => (
                  <Link
                    key={book.abbrev}
                    href={`/bible/${book.abbrev}/1`}
                    className="p-3 bg-white rounded-md border border-gray-200 hover:border-secondary hover:shadow transition-all flex justify-between items-center"
                  >
                    <span className="font-medium">{book.name}</span>
                    <span className="text-sm text-gray-500">
                      {book.chapters} cap.
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
