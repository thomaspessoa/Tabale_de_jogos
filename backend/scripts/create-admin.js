// backend/scripts/create-admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/user.model');
require('dotenv').config({ path: '../.env' });

const createAdmin = async (username, password) => {
  if (!process.env.MONGO_URI) {
    console.error('ERRO: Variável de ambiente MONGO_URI não definida.');
    process.exit(1);
  }

  if (!username || !password) {
    console.error('ERRO: Por favor, forneça um nome de usuário e uma senha.');
    console.log('Uso: node scripts/create-admin.js <username> <password>');
    process.exit(1);
  }

  try {
    console.log('Conectando ao MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB com sucesso.');

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error(`ERRO: O usuário "${username}" já existe.`);
      mongoose.connection.close();
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = new User({
      username,
      password: hashedPassword,
    });

    await adminUser.save();
    console.log(`\n🎉 Usuário administrador "${username}" criado com sucesso!`);
    console.log('Agora você pode usar essas credenciais para fazer login no painel de administração.');

  } catch (error) {
    console.error('Ocorreu um erro inesperado:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('\nConexão com o MongoDB fechada.');
  }
};

const username = process.argv[2];
const password = process.argv[3];

createAdmin(username, password);
