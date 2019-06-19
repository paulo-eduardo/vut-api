const request = require('supertest')
const { expect } = require('chai')
const server = require('../src/index')
const truncate = require('./util/truncate')

describe('Tools API Tests', function () {
  this.enableTimeouts(false)
  let token

  before(async () => {
    // runs before all tests
    // gets a new token for the requests

    await truncate.truncateUser()

    await request(server)
      .post('/v1/register/')
      .send({ name: 'Nay', email: 'nay@linda.com', password: '123456' })

    const response = await request(server)
      .post('/v1/oauth/token')
      .send({ email: 'nay@linda.com', password: '123456' })

    token = response.body.access_token
  })

  it('GET /v1/tools/ returns an array of movies', async () => {
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
})

// describe('Tools API Tests', () => {
//   let token;

//   before(async () => {
//     // runs before all tests
//     // gets a new token for the requests

//     await truncate.truncateUser();

//     const response = await request(server)
//       .post('/v1/register/')
//       .send({ name: 'Nay', email: 'nay@linda.com', password: '123456' });
//     token = response.body.access_token;
//   });

//   it('GET /v1/tools/ returns an array of movies', async () => {
//     const response = await request(server)
//       .get('/v1/tools/')
//       .set({
//         Authorization: `Bearer ${token}`,
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       });

//     expect(response.status).to.equal(200);
//     expect(response.body).to.be.an.instanceof(Array);
//   });

//   it('POST /v1/tools/ create and return an tool', async () => {
//     const response = await request(server)
//       .post('/v1/tools/')
//       .set({
//         Authorization: `Bearer ${token}`,
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       })
//       .send({
//         title: 'Hello, world!',
//         link: 'Hello, world!',
//         description: 'Hello, world!',
//         tags: ['Hello, world!'],
//       });
//     expect(response.status).to.equal(201);
//   });
// });
