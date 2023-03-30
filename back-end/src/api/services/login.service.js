const { User } = require('../../database/models');

const loginRequest = async ({ email }) => {
  const user = await User.findOne({
    where: { email },
  });

  return { status: 200, message: user };
};

module.exports = {
  loginRequest,
};
