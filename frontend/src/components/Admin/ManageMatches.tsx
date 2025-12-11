'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';

interface Team {
  _id: string;
  name: string;
  logoUrl?: string;
}

interface Match {
    _id: string;
    homeTeam: Team;
    awayTeam: Team;
    scoreHome: number;
    scoreAway: number;
}

export default function ManageMatches() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [form, setForm] = useState({
        homeTeam: '',
        awayTeam: '',
        scoreHome: 0,
        scoreAway: 0,
    });
     const [error, setError] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await api.get('/teams');
                setTeams(res.data);
            } catch (err) {
                console.error("Failed to fetch teams", err);
                setError('Não foi possível carregar os times.');
            }
        };

        const fetchMatches = async () => {
             try {
                const res = await api.get('/matches');
                setMatches(res.data);
            } catch (err) {
                console.error("Failed to fetch matches", err);
                setError('Não foi possível carregar as partidas.');
            }
        };

        fetchTeams();
        fetchMatches();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (form.homeTeam === form.awayTeam) {
            setError('O time da casa e o visitante não podem ser o mesmo.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const res = await api.post('/matches', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Refetch matches to display the new one
             const newMatches = await api.get('/matches');
             setMatches(newMatches.data);
        } catch (err) {
            console.error(err);
            setError('Falha ao registrar a partida.');
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Gerenciar Partidas</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</p>}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <select name="homeTeam" onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded">
                        <option value="">Selecione o Time da Casa</option>
                        {teams.map(team => <option key={team._id} value={team._id}>{team.name}</option>)}
                    </select>
                    <select name="awayTeam" onChange={handleChange} required className="w-full p-2 bg-gray-700 rounded">
                        <option value="">Selecione o Time Visitante</option>
                        {teams.map(team => <option key={team._id} value={team._id}>{team.name}</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input type="number" name="scoreHome" placeholder="Gols Casa" value={form.scoreHome} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
                    <input type="number" name="scoreAway" placeholder="Gols Visitante" value={form.scoreAway} onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
                </div>
                <button type="submit" className="w-full bg-green-600 p-2 rounded">Registrar Partida</button>
            </form>
             <h3 className="text-xl font-bold mt-6 mb-4">Partidas Recentes</h3>
            <div className="space-y-4">
                {matches.map(match => (
                    <div key={match._id} className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                        <span className="font-semibold">{match.homeTeam.name}</span>
                        <span className="text-lg font-bold">{match.scoreHome} x {match.scoreAway}</span>
                        <span className="font-semibold">{match.awayTeam.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
