"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { bibleService } from "../../services/bibleService";
import { SearchResult } from "../../types/bible";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "@/components/Navbar";

// Create a separate component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState<string>(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(!!initialQuery);

  useEffect(() => {
    // Se houver uma query inicial, realizar a busca automaticamente
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");

    try {
      const data = await bibleService.search(searchQuery);
      setResults(data);
      setSearched(true);
    } catch (err) {
      console.error("Erro na busca:", err);
      setError("Ocorreu um erro durante a busca. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
    // Atualiza a URL com o parâmetro de busca
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Busca Bíblica</h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-grow">
              <Input
                placeholder="Digite um termo, referência ou frase para buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
              />
            </div>
            <Button type="submit" isLoading={loading}>
              Buscar
            </Button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
          </div>
        ) : searched ? (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">
              {results.length === 0
                ? "Nenhum resultado encontrado"
                : `${results.length} resultado(s) encontrado(s)`}
            </h2>

            {results.length > 0 && (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-4 last:border-0"
                  >
                    <div className="flex items-start gap-2">
                      <Link
                        href={`/bible/${result.book.abbrev}/${result.chapter}`}
                        className="text-purple-700 font-medium hover:underline"
                      >
                        {result.book.name} {result.chapter}:
                        {result.verse.number}
                      </Link>
                    </div>

                    <p className="text-gray-700 mt-1">{result.verse.text}</p>

                    <div className="mt-2 flex gap-2">
                      <Link
                        href={`/bible/${result.book.abbrev}/${result.chapter}`}
                        className="text-sm text-purple-700 hover:underline"
                      >
                        Ver capítulo
                      </Link>
                      <span className="text-gray-400">|</span>
                      <Link
                        href={`/analysis?book=${result.book.abbrev}&chapter=${result.chapter}&verses=${result.verse.number}`}
                        className="text-sm text-purple-700 hover:underline"
                      >
                        Analisar versículo
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}

// Main component with Suspense boundary
export default function Search() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div className="p-6">Carregando...</div>}>
        <SearchContent />
      </Suspense>
    </ProtectedRoute>
  );
}
