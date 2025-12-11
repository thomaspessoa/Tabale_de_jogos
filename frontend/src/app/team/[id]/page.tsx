'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

interface Team {
  _id: string;
  name: string;
  shield: string;
  goalsFor: number;
}

interface Player {
  _id: string;
  name: string;
  position: string;
  goals: number;
  yellowCards: number;
  redCards: number;
}

export default function TeamPage() {
  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/api/teams/${id}`)
        .then(response => setTeam(response.data))
        .catch(error => console.error('Error fetching team:', error));

      axios.get(`/api/players/team/${id}`)
        .then(response => setPlayers(response.data))
        .catch(error => console.error('Error fetching players:', error));
    }
  }, [id]);

  if (!team) {
    return <div>Carregando...</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/stadium-background.jpg')" }}
    >
      <div className="bg-black bg-opacity-70 min-h-screen p-8">
        <div className="container mx-auto">
          <div className="flex items-center mb-8">
            <Image src={team.shield} alt={team.name} width={100} height={100} className="mr-4" />
            <h1 className="text-4xl font-bold text-white">{team.name}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Estatísticas do Time</h2>
              <p className="text-white">Gols Marcados: {team.goalsFor}</p>
              {/* Add more team stats here */}
            </div>

            <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Jogadores</h2>
              <ul>
                {players.map(player => (
                  <li key={player._id} className="text-white border-b border-gray-700 py-2">
                    <p className="font-bold">{player.name} ({player.position})</p>
                    <p>Gols: {player.goals} | Amarelos: {player.yellowCards} | Vermelhos: {player.redCards}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
