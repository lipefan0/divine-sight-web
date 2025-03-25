import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="lg:h-[360px] h-80 rounded-b-[60px] bg-primary">
        <div className="max-w-4xl mx-auto h-full flex justify-center items-center">
          <section className="flex flex-col p-12 lg:flex-row items-center justify-between lg:gap-10 gap-4 pt-10">
            <div>
              <h1 className="font-semibold lg:text-6xl text-4xl text-secondary text-left lg:mb-4">
                Divine Sight
              </h1>
              <span className="font-semibold lg:text-4xl text-lg text-white mt-2 block">
                Análise Bíblica com I.A
              </span>
              <div className="flex justify-around gap-4 lg:mt-8 mt-6">
                <Link
                  className="bg-secondary text-white py-2 px-8 rounded-lg shadow hover:bg-amber-400 transition-all duration-300"
                  href="/auth/login"
                >
                  Começar
                </Link>
                <Link
                  className="border-secondary bg-[#FFF7D6] transition-all duration-300 hover:bg-white border text-secondary py-2 px-8 rounded-lg shadow"
                  href="/auth/register"
                >
                  Cadastrar
                </Link>
              </div>
            </div>
            <div className="">
              <Image
                className="lg:relative lg:w-[360px] w-36 right-0 -bottom-6"
                src="/book.png"
                width={360}
                height={360}
                alt="Book"
              />
            </div>
          </section>
        </div>
      </div>

      <div className="mx-auto p-12 lg:max-w-5xl">
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-2 items-center">
          <div className="flex items-center justify-between lg:gap-4 p-4 bg-alternativo rounded-xl max-h-[220px]">
            <Image
              src="/jesus-nuvem.svg"
              width={320}
              height={320}
              alt="Bible"
              className="lg:w-80 w-40"
            />
            <p className="lg:text-2xl text-md text-white">
              Leia a Bíblia completa. Ficou com dúvidas? Analise o versículo e a
              IA te explica.
            </p>
          </div>
          <div className="flex flex-col items-center justify-between lg:gap-2 p-4 border-primary border-2 rounded-xl max-h-[220px]">
            <h2 className="lg:text-4xl text-2xl font-semibold">
              Começe agora!
            </h2>
            <p className="lg:text-xl text-md text-alternativo">
              Leia a Bíblia e faça suas analises com a IA. Lembrando que a IA,
              te ajuda a entender o versículo, mas não substitui a leitura da
              Bíblia.
            </p>
            <div className="flex justify-around gap-4">
              <Link
                className="bg-primary text-white py-2 px-8 rounded-lg shadow hover:bg-pink-700 transition-all duration-300"
                href="/auth/login"
              >
                Começar
              </Link>
              <Link
                className="border-primary bg-pink-100 transition-all duration-300 hover:bg-pink-200 border text-primary py-2 px-8 rounded-lg shadow"
                href="/auth/register"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <span className="font-light text-sm italic ">
            O Divine Sight oferece uma perspectiva adicional para o estudo da
            Bíblia, através de IA treinada em teologia. Utilize-o como um
            complemento aos ensinamentos e orientações de seu pastor ou teólogo,
            nunca como um substituto.
          </span>
        </section>
      </div>
      <Footer />
    </div>
  );
}
