const userMock = {
  id: 1,
  email: 'zebirita@email.com',
  name: 'Cliente Zé Birita',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer',
};

const userLoginMock = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const userLoginMockInvalid = {
  email: 'invalid_email',
  password: 'invalidTest',
};

const userPasswordInvalid = {
  email: 'adm@deliveryapp.com',
  password: 'invalidTest',
};

module.exports = {
    userMock,
    userLoginMock,
    userLoginMockInvalid,
    userPasswordInvalid,
};
