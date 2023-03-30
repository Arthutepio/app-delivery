const loginService = require('../services/login.service');

const loginRequest = async (req, res) => {
  const { email } = req.body;
  
  const user = await loginService.loginRequest({ email });

  if (!user || user === null) return res.status(404).json({ message: 'Not Found' });

  return res.status(200).json(user);
};

module.exports = {
  loginRequest,
};
