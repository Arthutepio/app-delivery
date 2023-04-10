const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { User } = require('../../database/models');

const app = require('../../api/app');
const { newRegisterMock,
    registerMockValid,
    registerMockInvalid,
} = require('../mocks/registerMocks');

chai.use(chaiHttp);
const { expect } = chai;

describe('testes para rota de /register', function () {
  beforeEach(function () { return sinon.restore(); });

  it('Caso 1-SUCESS: POST /register Deve retornar status 201 e id', async function () {
    sinon.stub(User, 'create').resolves(newRegisterMock);

    const response = await chai.request(app).post('/register').send(registerMockValid);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id').to.be.a('number');
  });

  it('Caso 2-FAILURE: POST /register com password invalido retorna status 409', async function () {
    const response = await chai.request(app).post('/register').send(registerMockInvalid);

    expect(response.status).to.equal(409);
    expect(response.body).to.be.deep.equal({ message: 'conflict' });
  });
});