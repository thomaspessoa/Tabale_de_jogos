const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const Team = require('../models/team.model');
const auth = require('../middleware/auth');

// Helper function to update team stats
const updateTeamStats = async (teamId, goalsFor, goalsAgainst, result) => {
    const team = await Team.findById(teamId);
    if (team) {
        team.goalsFor += goalsFor;
        team.goalsAgainst += goalsAgainst;
        team.goalDifference = team.goalsFor - team.goalsAgainst;

        if (result === 'win') {
            team.wins += 1;
            team.points += 3;
        } else if (result === 'draw') {
            team.draws += 1;
            team.points += 1;
        } else { // loss
            team.losses += 1;
        }
        await team.save();
    }
};


// @route   POST api/matches
// @desc    Create a match
// @access  Private
router.post('/', auth, async (req, res) => {
    const { homeTeam, awayTeam, scoreHome, scoreAway, yellowCardsHome, redCardsHome, foulsHome, yellowCardsAway, redCardsAway, foulsAway, date } = req.body;

    try {
        const newMatch = new Match({
            homeTeam,
            awayTeam,
            scoreHome,
            scoreAway,
            yellowCardsHome,
            redCardsHome,
            foulsHome,
            yellowCardsAway,
            redCardsAway,
            foulsAway,
            date
        });

        const match = await newMatch.save();

        // Determine result
        let homeResult, awayResult;
        if (scoreHome > scoreAway) {
            homeResult = 'win';
            awayResult = 'loss';
        } else if (scoreHome < scoreAway) {
            homeResult = 'loss';
            awayResult = 'win';
        } else {
            homeResult = 'draw';
            awayResult = 'draw';
        }

        // Update stats for both teams
        await updateTeamStats(homeTeam, scoreHome, scoreAway, homeResult);
        await updateTeamStats(awayTeam, scoreAway, scoreHome, awayResult);

        res.json(match);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/matches
// @desc    Get all matches
// @access  Public
router.get('/', async (req, res) => {
    try {
        const matches = await Match.find().populate('homeTeam').populate('awayTeam').sort({ date: -1 });
        res.json(matches);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
