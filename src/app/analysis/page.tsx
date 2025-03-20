"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { analysisService } from "../../services/analysisService";
import { bibleService } from "../../services/bibleService";
import {
  AnalysisRequest,
  AnalysisResponse,
  AnalysisType,
  Book,
} from "../../types/bible";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Analysis() {
  const searchParams = useSearchParams();

  const [books, setBooks] = useState<Book[]>([]);
  const [analysisTypes, setAnalysisTypes] = useState<AnalysisType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [analysisMode, setAnalysisMode] = useState<"passage" | "text">(
    "passage"
  );

  // Form para capturar os campos dos livros, capítulos, etc., que serão convertidos para o formato passage
  const {
    register: registerTemp,
    handleSubmit: handleSubmitTemp,
    setValue: setValueTemp,
    watch: watchTemp,
    formState: { errors: errorsTemp },
  } = useForm<AnalysisRequest>({
    defaultValues: {
      analysis_type: "general",
    },
  });

  const bookAbbrev = watchTemp("book");
  const selectedBook = books.find((b) => b.abbrev === bookAbbrev);
  const maxChapters = selectedBook?.chapters || 0;

  // Inicializar os dados necessários
  useEffect(() => {
    async function initialize() {
      try {
        const [booksData, typesData] = await Promise.all([
          bibleService.getBooks(),
          analysisService.getAnalysisTypes(),
        ]);

        if (Array.isArray(booksData)) {
          setBooks(booksData);
        } else {
          console.error("Dados de livros não são um array:", booksData);
          setBooks([]);
        }

        if (Array.isArray(typesData)) {
          setAnalysisTypes(typesData);
        } else {
          console.error(
            "Dados de tipos de análise não são um array:",
            typesData
          );
          setAnalysisTypes([]);
        }

        // Verificar se há parâmetros na URL para preencher o formulário
        const book = searchParams.get("book");
        const chapter = searchParams.get("chapter");
        const verses = searchParams.get("verses");

        if (book) setValueTemp("book", book);
        if (chapter) setValueTemp("chapter", parseInt(chapter));
        if (verses) setValueTemp("verses", verses);
      } catch (err) {
        console.error("Erro ao inicializar:", err);
        setError(
          "Erro ao carregar dados iniciais. Tente novamente mais tarde."
        );
      } finally {
        setInitializing(false);
      }
    }

    initialize();
  }, [searchParams, setValueTemp]);

  const onSubmit = async (data: AnalysisRequest) => {
    setLoading(true);
    setError("");

    try {
      // Construir o objeto AnalysisRequest conforme a nova interface
      let analysisRequest: AnalysisRequest;

      if (analysisMode === "text") {
        // Para o modo de texto, usamos o campo text diretamente
        analysisRequest = {
          text: data.text,
          analysis_type: data.analysis_type,
        };
      } else {
        // Para o modo de passagem, enviamos os dados do livro, capítulo e versículos
        const { book, chapter, verses } = data;

        if (!book) {
          throw new Error("Livro não selecionado");
        }

        analysisRequest = {
          book,
          chapter: Number(chapter),
          verses,
          analysis_type: data.analysis_type,
        };
      }

      console.log("Enviando requisição:", analysisRequest);
      const response = await analysisService.analyzePassage(analysisRequest);
      setResult(response);
    } catch (err: unknown) {
      console.error("Erro na análise:", err);

      // Type guard for API errors
      const apiError = err as { response?: { data?: { message?: string } } };
      setError(
        apiError.response?.data?.message ||
          "Ocorreu um erro durante a análise. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Análise Teológica
        </h1>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="mb-4">
            <div className="flex space-x-4 mb-6">
              <button
                type="button"
                className={`px-4 py-2 rounded-md ${
                  analysisMode === "passage"
                    ? "bg-purple-100 text-purple-800 font-medium"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setAnalysisMode("passage")}
              >
                Analisar Passagem
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md ${
                  analysisMode === "text"
                    ? "bg-purple-100 text-purple-800 font-medium"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setAnalysisMode("text")}
              >
                Analisar Texto
              </button>
            </div>

            {initializing ? (
              <div className="py-6 text-center">
                <div className="animate-spin inline-block rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-700 mb-2"></div>
                <p>Carregando...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitTemp(onSubmit)}>
                {analysisMode === "passage" ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Livro
                        </label>
                        <select
                          className="w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md focus:outline-none focus:border-purple-600"
                          {...registerTemp("book", {
                            required:
                              analysisMode === "passage"
                                ? "Selecione um livro"
                                : false,
                          })}
                        >
                          <option value="">Selecione</option>
                          {books.map((book) => (
                            <option key={book.abbrev} value={book.abbrev}>
                              {book.name}
                            </option>
                          ))}
                        </select>
                        {errorsTemp.book && (
                          <p className="mt-1 text-sm text-red-600">
                            {errorsTemp.book.message as string}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Capítulo
                        </label>
                        <select
                          className="w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md focus:outline-none focus:border-purple-600"
                          {...registerTemp("chapter", {
                            required:
                              analysisMode === "passage"
                                ? "Selecione um capítulo"
                                : false,
                          })}
                          disabled={!bookAbbrev}
                        >
                          <option value="">Selecione</option>
                          {[...Array(maxChapters)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        {errorsTemp.chapter && (
                          <p className="mt-1 text-sm text-red-600">
                            {errorsTemp.chapter.message as string}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Versículos (opcional)
                        </label>
                        <Input
                          placeholder="Ex: 1 ou 1-5"
                          {...registerTemp("verses")}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Texto para Análise
                    </label>
                    <textarea
                      className="w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md focus:outline-none focus:border-purple-600 h-36"
                      placeholder="Digite o texto bíblico que deseja analisar..."
                      {...registerTemp("text", {
                        required:
                          analysisMode === "text"
                            ? "Digite um texto para análise"
                            : false,
                      })}
                    />
                    {errorsTemp.text && (
                      <p className="mt-1 text-sm text-red-600">
                        {errorsTemp.text.message as string}
                      </p>
                    )}
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Análise
                  </label>
                  <select
                    className="w-full px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md focus:outline-none focus:border-purple-600"
                    {...registerTemp("analysis_type", {
                      required: "Selecione um tipo de análise",
                    })}
                  >
                    {analysisTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  {errorsTemp.analysis_type && (
                    <p className="mt-1 text-sm text-red-600">
                      {errorsTemp.analysis_type.message as string}
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <Button type="submit" variant="primary" isLoading={loading}>
                    Analisar
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Resultado da Análise</h2>

            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Passagem</h3>
              <div className="bg-gray-50 p-4 rounded-md">{result.passage}</div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">
                Análise ({result.analysis_type})
              </h3>
              <div className="bg-gray-50 p-4 rounded-md whitespace-pre-line">
                {result.analysis}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
