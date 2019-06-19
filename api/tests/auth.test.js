const { expect } = require('chai')
const request = require('supertest')
const server = require('../src/index')
const truncate = require('./util/truncate')

describe('Auth controller', function () {
  this.enableTimeouts(false)

  it('should register', async () => {
    await truncate.truncateUser()
    const response = await request(server)
      .post('/v1/register')
      .send({ name: 'Nay', email: 'nay@linda.com', password: '123456' })
    expect(response.status).to.equal(201)
  })
})
