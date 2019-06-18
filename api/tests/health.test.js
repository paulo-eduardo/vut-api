const { expect } = require('chai')
const request = require('supertest')
const server = require('../src/index')

describe('Health', async () => {
  it('should get Server is up', async () => {
    const response = await request(server).get('/v1/')

    expect(response.status).to.equal(200)
    expect(response.body.message).to.equal('Server is up')
  })
})
