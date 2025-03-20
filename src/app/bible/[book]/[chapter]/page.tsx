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
      <div className="container mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Cabeçalho de navegação fixo em telas pequenas */}
        <div className="sticky top-0 bg-white z-10 py-4 border-b border-gray-200 mb-4">
          <div className="flex items-center justify-between">
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
              <span>Livros</span>
            </Link>
            <h1 className="text-lg md:text-2xl font-bold text-gray-900">
              {chapter
                ? `${chapter.book.name} ${chapter.chapter}`
                : "Carregando..."}
            </h1>
            <div className="w-8"></div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : chapter ? (
          <>
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6">
              {/* Texto com tipografia responsiva */}
              <article className="prose prose-xl sm:prose-base md:prose-lg max-w-prose mx-auto">
                {chapter.verses.map((verse) => (
                  <p className="text-xl mb-2" key={verse.number}>
                    <span className="text-primary font-semibold mr-2">
                      {verse.number}.
                    </span>
                    {verse.text}
                  </p>
                ))}
              </article>
            </div>

            {/* Navegação inferior */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
              <button
                onClick={navigateToPreviousChapter}
                disabled={chapterNumber <= 1}
                className={`w-full sm:w-auto px-4 py-2 rounded-md flex items-center justify-center gap-2 ${
                  chapterNumber <= 1
                    ? "text-gray-400 bg-gray-100 cursor-not-allowed"
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
                <span>Anterior</span>
              </button>

              {book && (
                <Link
                  href={`/analysis?book=${bookAbbrev}&chapter=${chapterNumber}`}
                  className="w-full sm:w-auto px-4 py-2 bg-secondary text-white rounded-md text-center hover:bg-primary transition-colors"
                >
                  Analisar
                </Link>
              )}

              <button
                onClick={navigateToNextChapter}
                disabled={!book || chapterNumber >= book.chapters}
                className={`w-full sm:w-auto px-4 py-2 rounded-md flex items-center justify-center gap-2 ${
                  !book || chapterNumber >= book.chapters
                    ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                    : "text-primary bg-purple-50 hover:bg-purple-100"
                }`}
              >
                <span>Próximo</span>
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
