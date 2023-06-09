const generateHash = require('md5');
const { User } = require('../../database/models');
const GenericError = require('../utils/GenericError');
const { generateToken } = require('../utils/token');

const loginRequest = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new GenericError('404', 'Not Found');
  }

  const hash = generateHash(password);
  if (hash !== user.password) {
    throw new GenericError('404', 'Not Found');
  }

  const payload = { email: user.email, role: user.role, name: user.name };
  const token = await generateToken(payload);

  return {
    token,
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

module.exports = {
  loginRequest,
};
