require('dotenv').config();

const {
  PORT = 3001,
  MONGO_URL,
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  MONGO_URL: NODE_ENV === 'production' ? MONGO_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT,
};
