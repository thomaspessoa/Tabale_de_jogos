const router = require('express').Router();
let Team = require('../models/team.model');
const auth = require('../middleware/auth');

router.route('/').get((req, res) => {
  Team.find()
    .sort({ points: -1, goalDifference: -1, goalsFor: -1 })
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(auth, (req, res) => {
  const { name, shield } = req.body;

  const newTeam = new Team({
    name,
    shield,
  });

  newTeam.save()
    .then(() => res.json('Team added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Team.findById(req.params.id)
    .then(team => res.json(team))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(auth, (req, res) => {
  Team.findById(req.params.id)
    .then(team => {
      team.name = req.body.name || team.name;
      team.shield = req.body.shield || team.shield;
      team.points = req.body.points || team.points;
      team.wins = req.body.wins || team.wins;
      team.draws = req.body.draws || team.draws;
      team.losses = req.body.losses || team.losses;
      team.goalsFor = req.body.goalsFor || team.goalsFor;
      team.goalsAgainst = req.body.goalsAgainst || team.goalsAgainst;
      team.goalDifference = (team.goalsFor - team.goalsAgainst) || team.goalDifference;

      team.save()
        .then(() => res.json('Team updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(auth, (req, res) => {
  Team.findByIdAndDelete(req.params.id)
    .then(() => res.json('Team deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
