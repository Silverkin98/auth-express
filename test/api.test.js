const request = require('supertest');

const app = require('../src/app');

describe('GET /api/users/getall', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/users/getall')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});
