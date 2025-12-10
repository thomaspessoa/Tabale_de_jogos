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
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');

const connection = mongoose.connection;
connection.once('open', async () => {
  console.log("MongoDB database connection established successfully");

  // Função para criar usuário admin padrão se não existir nenhum
  const createDefaultAdmin = async () => {
    try {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('Nenhum usuário encontrado. Criando usuário admin padrão...');
        const hashedPassword = await bcrypt.hash('admin', 10);
        const defaultAdmin = new User({
          username: 'admin',
          password: hashedPassword,
        });
        await defaultAdmin.save();
        console.log('Usuário "admin" com senha "admin" criado com sucesso.');
      } else {
        console.log('Usuários já existem no banco de dados. Nenhuma ação necessária.');
      }
    } catch (error) {
      console.error('Erro ao tentar criar o usuário admin padrão:', error);
    }
  };

  await createDefaultAdmin();
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
