import Image from "next/image";
import Link from "next/link";
import { FiSend } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="lg:h-[360px] w-full h-80 rounded-t-[60px] bg-primary">
      <div className="lg:max-w-xl w-sm px-8 py-4 mx-auto">
        <div className="flex justify-between items-center">
          <ul className="flex flex-col gap-2 font-medium text-secondary lg:text-md text-sm">
            <li className="hover:underline hover:underline-offset-2">
              <Link href="/bible">Ler a Bíblia</Link>
            </li>
            <li className="hover:underline hover:underline-offset-2">
              <a href="/search">Procurar por versículo</a>
            </li>
            <li className="hover:underline hover:underline-offset-2">
              <a href="/analysis">Analisar versículo</a>
            </li>
          </ul>

          <Image
            src="/jesus.png"
            width={100}
            height={100}
            alt="Logo"
            className="w-36"
          />
        </div>

        <div className="mt-8">
          <form action="submit">
            <label className="text-2xl text-white" htmlFor="">
              Assine nossa newsletter!
            </label>
            <div className="flex mt-2 w-full max-w-md">
              <input
                className="w-full px-4 py-2 border-2 bg-white border-secondary/80 rounded-l-md focus:outline-none focus:ring-2 focus:ring-secondary/50 text-gray-800 placeholder-gray-500"
                type="email"
                placeholder="Digite seu email"
                aria-label="Endereço de email para newsletter"
                required
              />
              <button
                className="bg-alternativo p-2 text-white rounded-r-md hover:bg-alternativo/90 transition-colors flex items-center justify-center"
                type="submit"
                aria-label="Enviar inscrição"
                disabled
              >
                <FiSend className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}
