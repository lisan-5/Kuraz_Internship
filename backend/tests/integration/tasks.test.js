// backend/tests/integration/tasks.test.js
const request = require('supertest');
const app = require('../../app');
const Task = require('../../models/Task');

describe('Task API', () => {
  let authToken;

  beforeAll(async () => {
    // Setup test user and get token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    
    authToken = res.body.token;
  });

  it('should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Integration Test Task' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });
});