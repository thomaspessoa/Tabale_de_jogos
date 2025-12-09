const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  shield: { type: String, required: true }, // URL to the shield image
  points: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  goalsFor: { type: Number, default: 0 },
  goalsAgainst: { type: Number, default: 0 },
  goalDifference: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
