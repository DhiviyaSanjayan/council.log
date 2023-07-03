// INTEGRATION TESTING VIA SUPERTEST

const request = require('supertest');
const app = require('../server/app');  // Import Express app

test('GET /api', async () => {
  const response = await request(app).get('/api');
  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe('Hello, World!');
});




// POST

// Test creating a new user
test('POST /users', async () => {
  const response = await request(app)
    .post('/users')
    .send({ username: 'test', password: 'password' });

  expect(response.statusCode).toBe(201);
  expect(response.body.username).toBe('test');
});

// Test creating a new class
test('POST /classes', async () => {
  const response = await request(app)
    .post('/classes')
    .send({ 
        class_name: 'Test Class', 
        class_description: 'This is a description of the test class.', 
        class_subject: 'Test Subject', 
        duration: 60 
    });

  expect(response.statusCode).toBe(201);
  expect(response.body.class_name).toBe('Test Class');
  expect(response.body.class_description).toBe('This is a description of the test class.');
  expect(response.body.class_subject).toBe('Test Subject');
  expect(response.body.duration).toBe(60);
});

// Test registering a user to a class
test('POST /registrations', async () => {
  const response = await request(app)
    .post('/registrations')
    .send({ user_id: 1, class_id: 1, role: 'student' });

  expect(response.statusCode).toBe(201);
  expect(response.body.user_id).toBe(1);
  expect(response.body.class_id).toBe(1);
  expect(response.body.role).toBe('student');
});

// Test logging points for a user
test('POST /points_log', async () => {
  const response = await request(app)
    .post('/points_log')
    .send({ user_id: 1, points: 1, role: 'student' });

  expect(response.statusCode).toBe(201);
  expect(response.body.user_id).toBe(1);
  expect(response.body.points).toBe(1);
  expect(response.body.role).toBe('student');
});





// DELETE

// Test deleting a user
test('DELETE /users/:id', async () => {
    const response = await request(app).delete('/users/1');
    expect(response.statusCode).toBe(200);
  });
  
  // Test deleting a class
  test('DELETE /classes/:id', async () => {
    const response = await request(app).delete('/classes/1');
    expect(response.statusCode).toBe(200);
  });
  
  // Test deleting a registration
  test('DELETE /registrations/:id', async () => {
    const response = await request(app).delete('/registrations/1');
    expect(response.statusCode).toBe(200);
  });
  
  // Test deleting a points log
  test('DELETE /points_log/:id', async () => {
    const response = await request(app).delete('/points_log/1');
    expect(response.statusCode).toBe(200);
  });
  





// PATCH

// Test updating a user
test('PATCH /users/:id', async () => {
    const response = await request(app)
      .patch('/users/1')
      .send({ username: 'updated', password: 'updatedpassword' });
  
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe('updated');
    expect(response.body.password).toBe('updatedpassword');
  });
  
  // Test updating a class
  test('PATCH /classes/:id', async () => {
    const response = await request(app)
      .patch('/classes/1')
      .send({
        class_name: 'Updated Class',
        class_description: 'This is an updated description of the class.',
        class_subject: 'Updated Subject',
        duration: 120
      });
  
    expect(response.statusCode).toBe(200);
    expect(response.body.class_name).toBe('Updated Class');
    expect(response.body.class_description).toBe('This is an updated description of the class.');
    expect(response.body.class_subject).toBe('Updated Subject');
    expect(response.body.duration).toBe(120);
  });
  