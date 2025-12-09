const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const teamsRouter = require('./routes/teams');
const playersRouter = require('./routes/players');
const authRouter = require('./routes/auth');
const matchesRouter = require('./routes/matches');

app.use('/teams', teamsRouter);
app.use('/players', playersRouter);
app.use('/auth', authRouter);
app.use('/matches', matchesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
