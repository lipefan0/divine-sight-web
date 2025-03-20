import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary mb-4">
          <span className="text-primary">Divine Sight</span> - Analise Bíblica
          com IA
        </h1>
        <p className="text-xl text-grayDetail">
          Explore a Bíblia com análise teológica impulsionada por Inteligência
          Artificial
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-grayDetail p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h2 className="text-3xl font-semibold mb-2 text-background">
            Explore a Bíblia!
          </h2>
          <p className="text-background mb-4">
            Acesse todos os livros, capítulos e versículos da Bíblia de forma
            rápida e fácil
          </p>
          <div className="flex justify-center">
            <Link
              href="/bible"
              className="text-grayDetail bg-background p-2 rounded-md font-medium hover:text-pinkDetail shadow-md"
            >
              Começar a ler
            </Link>
          </div>
        </div>

        <div className="bg-grayDetail p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h2 className="text-3xl font-semibold mb-2 text-background">
            Busca Inteligente
          </h2>
          <p className="text-background mb-4">
            Encontre passagens específicas ou palavras-chave em toda a Bíblia em
            instantes
          </p>
          <div className="flex justify-center">
            <Link
              href="/search"
              className="text-grayDetail bg-background p-2 rounded-md font-medium hover:text-pinkDetail shadow-md"
            >
              Buscar passagens
            </Link>
          </div>
        </div>

        <div className="bg-grayDetail p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h2 className="text-3xl font-semibold mb-2 text-background">
            Análise Teológica
          </h2>
          <p className="text-background mb-4">
            Obtenha insight teológicos profundos sobre qualquer passagem bíblica
            com IA
          </p>
          <div className="flex justify-center">
            <Link
              href="/analysis"
              className="text-grayDetail bg-background p-2 rounded-md font-medium hover:text-pinkDetail shadow-md"
            >
              Analise textos
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 p-8 rounded-lg border border-purple-100">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">
          Comece Agora
        </h2>
        <p className="text-gray-700 mb-6">
          Registre-se para aproveitar todos os recursos da Divine Sight,
          incluindo anu00e1lises teolu00f3gicas personalizadas e salvamento de
          suas passagens favoritas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/auth/register"
            className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-md font-medium text-center transition-colors"
          >
            Criar Conta
          </Link>
          <Link
            href="/auth/login"
            className="bg-white hover:bg-gray-50 text-purple-700 px-6 py-3 rounded-md font-medium border border-purple-200 text-center transition-colors"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
