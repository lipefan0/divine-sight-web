import api from "./api";
import {
  Book,
  Chapter,
  Verse,
  SearchResult,
  BooksResponse,
  BookResponse,
  VerseResponse,
} from "../types/bible";

// Dados mockados para desenvolvimento
const mockBooks: Book[] = [
  { abbrev: "gn", name: "Gênesis", chapters: 50, testament: "old" },
  { abbrev: "ex", name: "Êxodo", chapters: 40, testament: "old" },
  { abbrev: "lv", name: "Levítico", chapters: 27, testament: "old" },
  { abbrev: "nm", name: "Números", chapters: 36, testament: "old" },
  { abbrev: "dt", name: "Deuteronômio", chapters: 34, testament: "old" },
  { abbrev: "js", name: "Josué", chapters: 24, testament: "old" },
  { abbrev: "jz", name: "Juízes", chapters: 21, testament: "old" },
  { abbrev: "rt", name: "Rute", chapters: 4, testament: "old" },
  { abbrev: "1sm", name: "1 Samuel", chapters: 31, testament: "old" },
  { abbrev: "2sm", name: "2 Samuel", chapters: 24, testament: "old" },
  { abbrev: "1rs", name: "1 Reis", chapters: 22, testament: "old" },
  { abbrev: "2rs", name: "2 Reis", chapters: 25, testament: "old" },
  { abbrev: "1cr", name: "1 Crônicas", chapters: 29, testament: "old" },
  { abbrev: "2cr", name: "2 Crônicas", chapters: 36, testament: "old" },
  { abbrev: "ed", name: "Esdras", chapters: 10, testament: "old" },
  { abbrev: "ne", name: "Neemias", chapters: 13, testament: "old" },
  { abbrev: "et", name: "Ester", chapters: 10, testament: "old" },
  { abbrev: "jó", name: "Jó", chapters: 42, testament: "old" },
  { abbrev: "sl", name: "Salmos", chapters: 150, testament: "old" },
  { abbrev: "pv", name: "Provérbios", chapters: 31, testament: "old" },
  { abbrev: "ec", name: "Eclesiastes", chapters: 12, testament: "old" },
  { abbrev: "ct", name: "Cânticos", chapters: 8, testament: "old" },
  { abbrev: "is", name: "Isaías", chapters: 66, testament: "old" },
  { abbrev: "jr", name: "Jeremias", chapters: 52, testament: "old" },
  { abbrev: "lm", name: "Lamentações", chapters: 5, testament: "old" },
  { abbrev: "ez", name: "Ezequiel", chapters: 48, testament: "old" },
  { abbrev: "dn", name: "Daniel", chapters: 12, testament: "old" },
  { abbrev: "os", name: "Oséias", chapters: 14, testament: "old" },
  { abbrev: "jl", name: "Joel", chapters: 3, testament: "old" },
  { abbrev: "am", name: "Amós", chapters: 9, testament: "old" },
  { abbrev: "ob", name: "Obadias", chapters: 1, testament: "old" },
  { abbrev: "jn", name: "Jonas", chapters: 4, testament: "old" },
  { abbrev: "mq", name: "Miquéias", chapters: 7, testament: "old" },
  { abbrev: "na", name: "Naum", chapters: 3, testament: "old" },
  { abbrev: "hc", name: "Habacuque", chapters: 3, testament: "old" },
  { abbrev: "sf", name: "Sofonias", chapters: 3, testament: "old" },
  { abbrev: "ag", name: "Ageu", chapters: 2, testament: "old" },
  { abbrev: "zc", name: "Zacarias", chapters: 14, testament: "old" },
  { abbrev: "ml", name: "Malaquias", chapters: 4, testament: "old" },
  { abbrev: "mt", name: "Mateus", chapters: 28, testament: "new" },
  { abbrev: "mc", name: "Marcos", chapters: 16, testament: "new" },
  { abbrev: "lc", name: "Lucas", chapters: 24, testament: "new" },
  { abbrev: "jo", name: "João", chapters: 21, testament: "new" },
  { abbrev: "at", name: "Atos", chapters: 28, testament: "new" },
  { abbrev: "rm", name: "Romanos", chapters: 16, testament: "new" },
  { abbrev: "1co", name: "1 Coríntios", chapters: 16, testament: "new" },
  { abbrev: "2co", name: "2 Coríntios", chapters: 13, testament: "new" },
  { abbrev: "gl", name: "Gálatas", chapters: 6, testament: "new" },
  { abbrev: "ef", name: "Efésios", chapters: 6, testament: "new" },
  { abbrev: "fp", name: "Filipenses", chapters: 4, testament: "new" },
  { abbrev: "cl", name: "Colossenses", chapters: 4, testament: "new" },
  { abbrev: "1ts", name: "1 Tessalonicenses", chapters: 5, testament: "new" },
  { abbrev: "2ts", name: "2 Tessalonicenses", chapters: 3, testament: "new" },
  { abbrev: "1tm", name: "1 Timóteo", chapters: 6, testament: "new" },
  { abbrev: "2tm", name: "2 Timóteo", chapters: 4, testament: "new" },
  { abbrev: "tt", name: "Tito", chapters: 3, testament: "new" },
  { abbrev: "fm", name: "Filemom", chapters: 1, testament: "new" },
  { abbrev: "hb", name: "Hebreus", chapters: 13, testament: "new" },
  { abbrev: "tg", name: "Tiago", chapters: 5, testament: "new" },
  { abbrev: "1pe", name: "1 Pedro", chapters: 5, testament: "new" },
  { abbrev: "2pe", name: "2 Pedro", chapters: 3, testament: "new" },
  { abbrev: "1jo", name: "1 João", chapters: 5, testament: "new" },
  { abbrev: "2jo", name: "2 João", chapters: 1, testament: "new" },
  { abbrev: "3jo", name: "3 João", chapters: 1, testament: "new" },
  { abbrev: "jd", name: "Judas", chapters: 1, testament: "new" },
  { abbrev: "ap", name: "Apocalipse", chapters: 22, testament: "new" },
];

// Função para gerar versículos de exemplo para desenvolvimento
const generateMockVerses = (count: number) => {
  const verses = [];
  for (let i = 1; i <= count; i++) {
    verses.push({
      number: i,
      text: `Este é um texto de exemplo para o versículo ${i}. Quando o backend estiver disponível, este texto será substituído pelo conteúdo real.`,
    });
  }
  return verses;
};

// Função para gerar resultados de busca para desenvolvimento
const generateMockSearchResults = (query: string, count: number = 5) => {
  const results = [];
  const randomBooks = Array.from(
    { length: count },
    () => mockBooks[Math.floor(Math.random() * mockBooks.length)]
  );

  for (let i = 0; i < count; i++) {
    const book = randomBooks[i];
    const chapter = Math.floor(Math.random() * book.chapters) + 1;
    const verse = Math.floor(Math.random() * 30) + 1;

    results.push({
      book: book, // Usar o livro completo para garantir tipos corretos
      chapter: chapter,
      verse: {
        number: verse,
        text: `Versículo ${verse}`,
      },
    });
  }

  return results;
};

export const bibleService = {
  async getBooks(): Promise<Book[]> {
    try {
      // A API retorna um objeto { books: Book[] }
      const response = await api.get<BooksResponse>("/api/books");

      return response.data.books;
    } catch (error) {
      console.error("Erro ao buscar livros da API:", error);
      // Fallback para dados mockados
      return mockBooks;
    }
  },

  async getBook(abbrev: string): Promise<Book> {
    try {
      // A API retorna um objeto { book: Book }
      const response = await api.get<BookResponse>(`/api/books/${abbrev}`);
      // Adiciona o atributo 'testament' caso não exista
      const book = {
        ...response.data.book,
        testament:
          response.data.book.testament ||
          (abbrev.startsWith("a") ? "old" : "new"),
      };
      return book;
    } catch (error) {
      console.error(`Erro ao buscar livro ${abbrev}:`, error);
      // Fallback para dados mockados
      const book = mockBooks.find((b) => b.abbrev === abbrev);
      if (!book) throw new Error(`Livro ${abbrev} não encontrado`);
      return book;
    }
  },

  async getChapter(abbrev: string, chapter: number): Promise<Chapter> {
    try {
      const response = await api.get<Chapter>(
        `/api/books/${abbrev}/chapters/${chapter}`
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar capítulo ${chapter} de ${abbrev}:`, error);
      // Fallback para dados mockados
      const book = mockBooks.find((b) => b.abbrev === abbrev);
      if (!book) throw new Error(`Livro ${abbrev} não encontrado`);
      if (chapter > book.chapters)
        throw new Error(`Capítulo ${chapter} não existe em ${book.name}`);

      return {
        book: {
          abbrev: book.abbrev,
          name: book.name,
        },
        chapter: chapter,
        verses: generateMockVerses(25), // Gera um número fixo de versículos para demonstração
      };
    }
  },

  async getVerse(
    abbrev: string,
    chapter: number,
    verse: number
  ): Promise<Verse> {
    try {
      const response = await api.get<VerseResponse>(
        `/api/books/${abbrev}/chapters/${chapter}/verses/${verse}`
      );
      return response.data.verse;
    } catch (error) {
      console.error(
        `Erro ao buscar versículo ${verse} do capítulo ${chapter} de ${abbrev}:`,
        error
      );
      // Fallback para dados mockados
      return {
        number: verse,
        text: `Este é um texto de exemplo para o versículo ${verse}.`,
      };
    }
  },

  async getVerses(
    abbrev: string,
    chapter: number,
    verses: string
  ): Promise<Verse[]> {
    try {
      const response = await api.get<{ verses: Verse[] }>(
        `/api/books/${abbrev}/chapters/${chapter}/verses/${verses}`
      );
      return response.data.verses || [];
    } catch (error) {
      console.error(
        `Erro ao buscar versículos ${verses} do capítulo ${chapter} de ${abbrev}:`,
        error
      );
      // Fallback para dados mockados
      const versesCount = verses.includes("-")
        ? parseInt(verses.split("-")[1]) - parseInt(verses.split("-")[0]) + 1
        : verses.split(",").length;

      return generateMockVerses(versesCount);
    }
  },

  async search(query: string): Promise<SearchResult[]> {
    try {
      const response = await api.get<{ results: SearchResult[] }>(
        "/api/search",
        {
          params: { q: query },
        }
      );
      return response.data.results || [];
    } catch (error) {
      console.error(`Erro na busca por "${query}":`, error);
      // Fallback para dados mockados
      return generateMockSearchResults(query);
    }
  },
};
