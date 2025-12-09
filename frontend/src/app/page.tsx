import ChampionshipTable from '@/components/ChampionshipTable';

export default function Home() {
  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/stadium-background.jpg')" }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen flex flex-col items-center justify-center">
        <div className="container mx-auto p-4 md:p-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
            Campeonato da Cidade
          </h1>
          <ChampionshipTable />
        </div>
      </div>
    </main>
  );
}
