const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

const keySecret = async () => {
  const data = await fs.readFile(
    './jwt.evaluation.key',
    'utf-8',
  );
  return data;
};

const generateToken = async (payload) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const secretKey = await keySecret();
  const token = jwt.sign(payload, secretKey, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
};
