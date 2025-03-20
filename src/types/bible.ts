export interface Book {
  abbrev: string;
  name: string;
  chapters: number;
  testament?: "old" | "new";
}

export interface Chapter {
  book: {
    abbrev: string;
    name: string;
  };
  chapter: number;
  verses: Verse[];
}

export interface Verse {
  number: number;
  text: string;
}

export interface VerseResponse {
  book: {
    abbrev: string;
    name: string;
  };
  chapter: number;
  verse: Verse;
}

export interface SearchResult {
  book: Book;
  chapter: number;
  verse: {
    number: number;
    text: string;
  };
}

export interface BooksResponse {
  books: Book[];
}

export interface BookResponse {
  book: Book;
}

export interface AnalysisType {
  id: string;
  name: string;
  description: string;
}

export interface AnalysisRequest {
  book?: string; // Abreviação do livro
  chapter?: number;
  verses?: string;
  text?: string; // Para análise de texto livre
  analysis_type: string;
}

export interface AnalysisResponse {
  passage: string;
  analysis: string;
  analysis_type: string;
  reference?: string;
  success?: boolean;
  type?: string;
}
