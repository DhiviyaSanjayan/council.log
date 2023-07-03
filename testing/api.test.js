// INTEGRATION TESTING VIA SUPERTEST

const request = require('supertest');
const app = require('../server/app');  // Import Express app

test('GET /api', async () => {
  const response = await request(app).get('/api');
  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe('Hello, World!');
});
