const { User } = require('../../database/models');

const loginRequest = async ({ email }) => User.findOne({ where: { email } });

module.exports = {
  loginRequest,
};
