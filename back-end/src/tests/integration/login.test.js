const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { User } = require('../../database/models');
const { userMock,
    userLoginMock,
    userLoginMockInvalid,
    userPasswordInvalid,
} = require('../mocks/loginMocks');

const app = require('../../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('testes para rota de /login', function () {
  beforeEach(function () { return sinon.restore(); });

  it('Caso 1-SUCESS: POST /login Deve retornar status 200 e token', async function () {
    sinon.stub(User, 'findOne').resolves(userMock);

    const response = await chai.request(app).post('/login').send(userLoginMock);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token').to.be.a('string');
  });

  it('Caso 2-FAILURE: POST /login com dados invalidos deve retornar status 404', async function () {
    const response = await chai.request(app).post('/login').send(userLoginMockInvalid);

    expect(response.status).to.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Not Found' });
  });

  it('Caso 3-FAILURE: POST /login password errado deve retornar status 404', async function () {
    const response = await chai.request(app).post('/login').send(userPasswordInvalid);

    expect(response.status).to.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Not Found' });
  });
});