const { expect } = require('chai')
const request = require('supertest')
const server = require('../src/index')
const truncate = require('./util/truncate')

describe('User controller', async () => {
  before(async () => {
    // runs before all tests in this block

    // Clean user tabble.
    await truncate.truncateUser()
  })

  it('should register', async () => {
    const response = await request(server)
      .post('/v1/register/')
      .send({ name: 'Nay', email: 'nay@linda.com', password: '123456' })
    expect(response.status).to.equal(201)
    expect(response.body).to.include.all.keys('message')
  })
})
