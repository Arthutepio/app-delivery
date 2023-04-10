const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../api/app');

const { Product } = require('../../database/models');
const productsMock = require('../mocks/productsMocks');

chai.use(chaiHttp);
const { expect } = chai;

chai.use(chaiHttp);

describe('testes para rota de /products', function () {
  beforeEach(function () { return sinon.restore(); });

  it('Caso 1-SUCESS: GET /products deve retornar status 200 e produtos', async function () {
    sinon.stub(Product, 'findAll').resolves(productsMock);

    const response = await chai.request(app).get('/products');

    console.log('response ===', response.body);

    expect(response.status).to.equal(200);
    // expect(response.body).to.be.an('array');
    // expect(response.body[0]).to.have.property('id');
    // expect(response.body[0]).to.have.property('name');
    // expect(response.body[0]).to.have.property('price');
    // expect(response.body[0]).to.have.property('url_image');
    // expect(response.body).to.have.property('token').to.be.a('string');
  });

  it('Caso 2-FAILURE: GET /products deve retornar status 200 e produtos', async function () {
    sinon.stub(Product, 'findAll').resolves();

    const response = await chai.request(app).get('/products');

    console.log('response ===', response.body);

    expect(response.status).to.equal(404);
    // expect(response.body).to.be.an('array');
    // expect(response.body[0]).to.have.property('id');
    // expect(response.body[0]).to.have.property('name');
    // expect(response.body[0]).to.have.property('price');
    // expect(response.body[0]).to.have.property('url_image');
    // expect(response.body).to.have.property('token').to.be.a('string');
  });
});
