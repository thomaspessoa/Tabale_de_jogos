'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ManageMatches from '@/components/Admin/ManageMatches';

export default function DashboardPage() {
  const [teamName, setTeamName] = useState('');
  const [teamShield, setTeamShield] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');
  const [playerTeam, setPlayerTeam] = useState('');
  const [teams, setTeams] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    } else {
      axios.get('/api/teams')
        .then(response => setTeams(response.data))
        .catch(error => console.error('Error fetching teams:', error));
    }
  }, [router]);

  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/teams/add', { name: teamName, shield: teamShield }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh teams list
      axios.get('/api/teams')
        .then(response => setTeams(response.data))
        .catch(error => console.error('Error fetching teams:', error));
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/players/add', { name: playerName, position: playerPosition, team: playerTeam }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh players list - you might want to fetch players for a specific team
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Painel do Administrador</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna 1: Adicionar Time e Jogador */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Adicionar Time</h2>
            <form onSubmit={handleAddTeam}>
              <input
                type="text"
                placeholder="Nome do Time"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 rounded"
              />
              <input
                type="text"
                placeholder="URL do Escudo"
                value={teamShield}
                onChange={(e) => setTeamShield(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 rounded"
              />
              <button type="submit" className="w-full bg-blue-600 p-2 rounded">Adicionar</button>
            </form>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Adicionar Jogador</h2>
            <form onSubmit={handleAddPlayer}>
              <input
                type="text"
                placeholder="Nome do Jogador"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 rounded"
              />
              <input
                type="text"
                placeholder="Posição"
                value={playerPosition}
                onChange={(e) => setPlayerPosition(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 rounded"
              />
              <select
                value={playerTeam}
                onChange={(e) => setPlayerTeam(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 rounded"
              >
                <option value="">Selecione um Time</option>
                {teams.map((team: any) => (
                  <option key={team._id} value={team._id}>{team.name}</option>
                ))}
              </select>
              <button type="submit" className="w-full bg-blue-600 p-2 rounded">Adicionar</button>
            </form>
          </div>
        </div>

        {/* Coluna 2: Gerenciar Partidas */}
        <div className="lg:col-span-2">
          <ManageMatches />
        </div>
      </div>
    </div>
  );
}
