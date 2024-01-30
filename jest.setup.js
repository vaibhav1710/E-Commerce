const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

module.exports = async () => {
  const uri = await mongod.getUri();

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection.on('error', (err) => {
    console.error(err);
  });
};

module.exports = async () => {
  await mongod.stop();
  await mongoose.connection.close();
};
