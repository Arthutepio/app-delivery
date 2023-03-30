const loginService = require('../services/login.service');

const loginRequest = async (req, res) => {
  const { email } = req.body;

  const { status, message } = await loginService.loginRequest({ email });

  return res.status(status).json(message);
};

module.exports = {
  loginRequest,
};
