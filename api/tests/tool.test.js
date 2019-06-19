const request = require('supertest')
const { expect } = require('chai')
const server = require('../src/index')
const truncate = require('./util/truncate')

const createATool = async (token, title, link, description, tags) => {
  const res = await request(server)
    .post('/v1/tools/')
    .set({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
    .send({ title, link, description, tags })
  return res.body._id
}

const createManyTools = async token => {
  await createATool(token, 'tool1', 'tool1', 'tool1', ['1'])
  await createATool(token, 'tool2', 'tool2', 'tool2', ['1', '2'])
  await createATool(token, 'tool3', 'tool3', 'tool3', ['1', '2', '3'])
  await createATool(token, 'tool4', 'tool4', 'tool4', ['1', '2', '3', '4'])
  await createATool(token, 'tool5', 'tool5', 'tool5', ['1', '2', '3', '4', '5'])
}

describe('Tools API Tests', function () {
  this.enableTimeouts(false)
  let token
  let idTool

  before(async () => {
    // runs before all tests
    // gets a new token for the requests

    await truncate.truncateUser()
    await truncate.truncateTools()

    await request(server)
      .post('/v1/register/')
      .send({ name: 'Nay', email: 'nay@linda.com', password: '123456' })

    const response = await request(server)
      .post('/v1/oauth/token')
      .send({ email: 'nay@linda.com', password: '123456' })

    token = response.body.access_token

    await createManyTools(token)
    idTool = await createATool(token, 'teste', 'teste', 'teste', ['teste'])
  })

  it('GET /v1/tools/ returns an array of tool', async () => {
    const response = await request(server)
      .get('/v1/tools/')
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })

    expect(response.status).to.equal(200)
    expect(response.body).to.be.an.instanceof(Array)
  })

  it('POST /v1/tools/ create and return antool', async () => {
    const response = await request(server)
      .post('/v1/tools/')
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
      .send({
        title: 'Hello, world!',
        link: 'Hello, world!',
        description: 'Hello, world!',
        tags: ['Hello, world!']
      })
    expect(response.status).to.equal(201)
    expect(response.body).to.include.all.keys(
      'title',
      'link',
      'description',
      'tags',
      '_id'
    )
  })

  it('GET /v1/tool/:id get a tool with id', async () => {
    const response = await request(server)
      .get(`/v1/tool/${idTool}`)
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    expect(response.status).to.equal(200)
    expect(response.body._id).to.equal(idTool)
  })

  it('PUT /v1/tool/:id change a tool', async () => {
    const response = await request(server)
      .put(`/v1/tool/${idTool}`)
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
      .send({
        title: 'Hello, world!',
        link: 'Hello, world!',
        description: 'Hello, world!',
        tags: ['Hello, world!']
      })
    expect(response.status).to.equal(200)
    expect(response.body.title).to.equal('Hello, world!')
    expect(response.body.link).to.equal('Hello, world!')
    expect(response.body.description).to.equal('Hello, world!')
    expect(response.body.tags[0]).to.equal('Hello, world!')
  })

  it('DELETE /v1/tool/:id Delete a tool', async () => {
    const response = await request(server)
      .delete(`/v1/tool/${idTool}`)
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    expect(response.status).to.equal(200)
  })

  it('GET /v1/tool?{*tags} Filter tool with tags', async () => {
    const response = await request(server)
      .get(`/v1/tool?tags=2,3`)
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    expect(response.status).to.equal(200)
    expect(response.body).to.be.an.instanceof(Array)
  })
})
