const loginService = require('../services/login.service');

const loginRequest = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginService.loginRequest({ email, password });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginRequest,
};
