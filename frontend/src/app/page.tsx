import Link from 'next/link';

export default function Home() {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/stadium-background.jpg')" }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen w-full flex flex-col items-center justify-center text-center">
        <div className="container mx-auto p-4 md:p-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Bem-vindo ao Campeonato da Cidade
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-12">
            Acompanhe a tabela de classificação ou gerencie o campeonato.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/tabela" legacyBehavior>
              <a className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105">
                Entrar como Visitante
              </a>
            </Link>
            <Link href="/admin/login" legacyBehavior>
              <a className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105">
                Login de Administrador
              </a>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
