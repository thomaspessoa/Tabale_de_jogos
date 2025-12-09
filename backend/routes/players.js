const router = require('express').Router();
let Player = require('../models/player.model');
const auth = require('../middleware/auth');

router.route('/').get((req, res) => {
  Player.find()
    .populate('team', 'name shield')
    .then(players => res.json(players))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(auth, (req, res) => {
  const { name, position, team } = req.body;

  const newPlayer = new Player({
    name,
    position,
    team,
  });

  newPlayer.save()
    .then(() => res.json('Player added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Player.findById(req.params.id)
    .populate('team', 'name shield')
    .then(player => res.json(player))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(auth, (req, res) => {
  Player.findById(req.params.id)
    .then(player => {
      player.name = req.body.name || player.name;
      player.position = req.body.position || player.position;
      player.team = req.body.team || player.team;
      player.goals = req.body.goals || player.goals;
      player.yellowCards = req.body.yellowCards || player.yellowCards;
      player.redCards = req.body.redCards || player.redCards;

      player.save()
        .then(() => res.json('Player updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(auth, (req, res) => {
  Player.findByIdAndDelete(req.params.id)
    .then(() => res.json('Player deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/team/:teamId').get((req, res) => {
  Player.find({ team: req.params.teamId })
    .then(players => res.json(players))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
