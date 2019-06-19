const { expect } = require('chai')
const request = require('supertest')
const server = require('../src/index')
const truncate = require('./util/truncate')

describe('Auth controller', function () {
  this.enableTimeouts(false)

  before(async () => {
    // runs before all tests

    await truncate.truncateUser()
  })

  it('should register', async () => {
    const response = await request(server)
      .post('/v1/register')
      .send({ name: 'Nay', email: 'nay@linda.com', password: '123456' })
    expect(response.status).to.equal(201)
  })

  it('should give an error trying to use same email', async () => {
    const response = await request(server)
      .post('/v1/register/')
      .send({ name: 'Nay', email: 'nay@linda.com', password: '123456' })
    expect(response.status).to.equal(400)
    expect(response.body).to.include.all.keys('code', 'message', 'description')
  })

  it('should return token for credentials', async () => {
    const response = await request(server)
      .post('/v1/oauth/token/')
      .send({ email: 'nay@linda.com', password: '123456' })
    expect(response.status).to.equal(200)
    expect(response.body).to.include.all.keys(
      'token_type',
      'expires_in',
      'access_token'
    )
  })
})
