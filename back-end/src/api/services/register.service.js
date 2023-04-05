const generateHash = require('md5');
const { User } = require('../../database/models');
const GenericError = require('../utils/GenericError');

const registerRequest = async ({ name, email, password, role }) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    throw new GenericError('409', 'conflict');
  }

  const hash = generateHash(password);

  const newUser = await User.create({ name, email, password: hash, role: role || 'customer' });

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
};

module.exports = {
  registerRequest,
};
