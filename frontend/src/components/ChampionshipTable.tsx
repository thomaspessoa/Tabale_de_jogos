'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

interface Team {
  _id: string;
  name: string;
  shield: string;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export default function ChampionshipTable() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    axios.get('/api/teams')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Time</th>
            <th className="py-3 px-4 text-left">P</th>
            <th className="py-3 px-4 text-left">V</th>
            <th className="py-3 px-4 text-left">E</th>
            <th className="py-3 px-4 text-left">D</th>
            <th className="py-3 px-4 text-left">GP</th>
            <th className="py-3 px-4 text-left">GC</th>
            <th className="py-3 px-4 text-left">SG</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">
                <Link href={`/team/${team._id}`} className="flex items-center">
                  <Image src={team.shield} alt={team.name} width={30} height={30} className="mr-3" />
                  {team.name}
                </Link>
              </td>
              <td className="py-3 px-4 font-bold">{team.points}</td>
              <td className="py-3 px-4">{team.wins}</td>
              <td className="py-3 px-4">{team.draws}</td>
              <td className="py-3 px-4">{team.losses}</td>
              <td className="py-3 px-4">{team.goalsFor}</td>
              <td className="py-3 px-4">{team.goalsAgainst}</td>
              <td className="py-3 px-4">{team.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
