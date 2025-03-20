"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { bibleService } from "../../../../services/bibleService";
import { Chapter, Book } from "../../../../types/bible";
import ProtectedRoute from "../../../../components/ProtectedRoute";

export default function BibleChapter() {
  const params = useParams();
  const router = useRouter();
  const bookAbbrev = params.book as string;
  const chapterNumber = parseInt(params.chapter as string);

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadChapter() {
      if (!bookAbbrev || !chapterNumber) return;

      try {
        setLoading(true);
        setError("");

        // Obter dados do livro
        const bookData = await bibleService.getBook(bookAbbrev);
        setBook(bookData);

        // Obter dados do capítulo
        const chapterData = await bibleService.getChapter(
          bookAbbrev,
          chapterNumber
        );
        setChapter(chapterData);
      } catch (err) {
        console.error("Erro ao carregar capítulo:", err);
        setError("Falha ao carregar o capítulo. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    loadChapter();
  }, [bookAbbrev, chapterNumber]);

  const navigateToNextChapter = () => {
    if (!book || !chapter) return;

    if (chapterNumber < book.chapters) {
      router.push(`/bible/${bookAbbrev}/${chapterNumber + 1}`);
    }
  };

  const navigateToPreviousChapter = () => {
    if (chapterNumber > 1) {
      router.push(`/bible/${bookAbbrev}/${chapterNumber - 1}`);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto py-6">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : chapter ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <Link
                href="/bible"
                className="text-primary hover:underline flex items-center gap-1"
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
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Voltar para os Livros</span>
              </Link>
              <h1 className="text-2xl font-bold text-center text-gray-900">
                {chapter.book.name} {chapter.chapter}
              </h1>
              <div className="w-32"></div>{" "}
              {/* Espaçador para balancear o layout */}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="space-y-2">
                {chapter.verses.map((verse) => (
                  <div key={verse.number} className="flex">
                    <span className="text-primary font-semibold mr-3 mt-1 text-sm">
                      {verse.number}
                    </span>
                    <p className="text-gray-800">{verse.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={navigateToPreviousChapter}
                disabled={chapterNumber <= 1}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  chapterNumber <= 1
                    ? "text-gray-400 bg-gray-100"
                    : "text-primary bg-purple-50 hover:bg-purple-100"
                }`}
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
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Capítulo Anterior</span>
              </button>

              {book && (
                <Link
                  href={`/analysis?book=${bookAbbrev}&chapter=${chapterNumber}`}
                  className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary transition-colors"
                >
                  Analisar Este Capítulo
                </Link>
              )}

              <button
                onClick={navigateToNextChapter}
                disabled={!book || chapterNumber >= book.chapters}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  !book || chapterNumber >= book.chapters
                    ? "text-gray-400 bg-gray-100"
                    : "text-primary bg-purple-50 hover:bg-purple-100"
                }`}
              >
                <span>Próximo Capítulo</span>
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
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Capítulo não encontrado.</p>
            <Link
              href="/bible"
              className="mt-4 inline-block text-primary hover:underline"
            >
              Voltar para os Livros
            </Link>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
