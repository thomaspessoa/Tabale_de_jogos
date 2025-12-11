'use client';

import ChampionshipTable from '@/components/ChampionshipTable';
import Link from 'next/link';

export default function TabelaPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/stadium-background.jpg')" }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen flex flex-col items-center justify-center">
        <div className="container mx-auto p-4 md:p-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
            Tabela do Campeonato
          </h1>
          <ChampionshipTable />
          <div className="text-center mt-8">
            <Link href="/" legacyBehavior>
              <a className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105">
                Voltar
              </a>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
