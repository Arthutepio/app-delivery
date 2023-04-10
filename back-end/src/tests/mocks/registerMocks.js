const newRegisterMock = {
  id: 4,
  name: 'new Register',
  email: 'newRegister@email.com',
  role: 'customer',
};

const registerMockValid = {
  name: 'new Register',
  email: 'newRegister@email.com',
  password: 'test_new',
};

const registerMockInvalid = {
  name: 'test_Error',
  email: 'testError',
  password: 'test',
};

module.exports = {
    newRegisterMock,
    registerMockValid,
    registerMockInvalid,
};
