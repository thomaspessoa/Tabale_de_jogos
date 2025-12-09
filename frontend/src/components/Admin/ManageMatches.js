import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMatches = () => {
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [form, setForm] = useState({
        homeTeam: '',
        awayTeam: '',
        scoreHome: 0,
        scoreAway: 0,
        yellowCardsHome: 0,
        redCardsHome: 0,
        foulsHome: 0,
        yellowCardsAway: 0,
        redCardsAway: 0,
        foulsAway: 0,
    });

    useEffect(() => {
        // Fetch Teams
        axios.get('http://localhost:5001/api/teams')
            .then(res => setTeams(res.data))
            .catch(err => console.error(err));

        // Fetch Matches
        axios.get('http://localhost:5001/api/matches')
            .then(res => setMatches(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.post('http://localhost:5001/api/matches', form, { headers: { 'x-auth-token': token } })
            .then(res => {
                setMatches([res.data, ...matches]);
                // Reset form or provide feedback
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="manage-matches">
            <h2>Registrar Nova Partida</h2>
            <form onSubmit={handleSubmit} className="match-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Time da Casa</label>
                        <select name="homeTeam" onChange={handleChange} required>
                            <option value="">Selecione</option>
                            {teams.map(team => <option key={team._id} value={team._id}>{team.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Time Visitante</label>
                        <select name="awayTeam" onChange={handleChange} required>
                            <option value="">Selecione</option>
                            {teams.map(team => <option key={team._id} value={team._id}>{team.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Gols Casa</label>
                        <input type="number" name="scoreHome" value={form.scoreHome} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Gols Visitante</label>
                        <input type="number" name="scoreAway" value={form.scoreAway} onChange={handleChange} />
                    </div>
                </div>

                {/* Add fields for cards and fouls as needed */}

                <button type="submit">Registrar Partida</button>
            </form>

            <h2 className="results-title">Resultados Recentes</h2>
            <div className="matches-list">
                {matches.map(match => (
                     <div key={match._id} className="match-card">
                        <div className="team-info">
                            <img src={match.homeTeam.logoUrl} alt={match.homeTeam.name} />
                            <span>{match.homeTeam.name}</span>
                        </div>
                        <div className="score">
                            <span>{match.scoreHome} x {match.scoreAway}</span>
                        </div>
                        <div className="team-info">
                            <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name} />
                            <span>{match.awayTeam.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageMatches;
