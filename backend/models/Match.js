const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  scoreHome: { type: Number, default: 0 },
  scoreAway: { type: Number, default: 0 },
  yellowCardsHome: { type: Number, default: 0 },
  redCardsHome: { type: Number, default: 0 },
  yellowCardsAway: { type: Number, default: 0 },
  redCardsAway: { type: Number, default: 0 },
  foulsHome: { type: Number, default: 0 },
  foulsAway: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Match', matchSchema);
