"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bibleService } from "../../services/bibleService";
import { Book } from "../../types/bible";
import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function BibleBooks() {
  const [books, setBooks] = useState<Book[]>([]);
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
      }
    }

    loadBooks();
  }, []);

  const oldTestamentBooks = books.filter((book) => book.testament === "old");
  const newTestamentBooks = books.filter((book) => book.testament === "new");

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="bg-primary rounded-t-[60px] h-[calc(100vh-74px)]">
        <div className="max-w-4xl mx-auto py-6">
          <h1 className="text-3xl font-bold text-white mb-6">
            Livros da Bíblia
          </h1>

          {/* Adicionar links para páginas específicas de testamento */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8">
            <Link
              href="/bible/oldTestament"
              className="group hover:bg-primary/20 text-white py-6 px-4 rounded-lg text-center transition-all hover:shadow-md flex flex-col items-center justify-center"
            >
              <Image
                src="/antigo-testamento.png"
                width={100}
                height={100}
                alt="livro do antigo testamento"
                className="lg:w-52 w-44 animate-float transition-all ease-in-out duration-300"
              />
              <span className="text-xl font-semibold">Antigo Testamento</span>
              <span className="text-sm mt-2">
                {oldTestamentBooks.length} livros
              </span>
            </Link>

            <Link
              href="/bible/newTestament"
              className="group hover:bg-primary/20 text-white py-6 px-4 rounded-lg text-center transition-all hover:shadow-md flex flex-col items-center justify-center"
            >
              <Image
                src="/novo-testamento.png"
                width={100}
                height={100}
                alt="livro do antigo testamento"
                className="lg:w-52 w-44 animate-float transition-all ease-in-out duration-300"
              />
              <span className="text-xl font-semibold">Novo Testamento</span>
              <span className="text-sm mt-2">
                {newTestamentBooks.length} livros
              </span>
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
