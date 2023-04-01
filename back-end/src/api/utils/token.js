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

const validateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    const secretKey = await keySecret();

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const payload = jwt.verify(token, secretKey);
      req.user = payload;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = {
  generateToken,
  validateToken,
};
