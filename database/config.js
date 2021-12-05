const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      ssl: true,
      sslValidate: false,
    });
    console.log('Conectado a la DB');
    console.log(`Escuchando puerto ${process.env.PORT}`);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { dbConnection };
