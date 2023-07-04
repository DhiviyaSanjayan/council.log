// Import Express app
const request = require('supertest');
const app = require('../server/api');

// Make sure server is running
test('Server should respond to GET /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

// GET
// Test getting user by id
test('GET /user/:id', async () => {
  const response = await request(app).get('/user/1');
  expect(response.statusCode).toBe(200);
  expect(response.body.id).toBe(1);
});

// Test getting user points log by id
test('GET /user/:id/pointslog', async () => {
  const response = await request(app).get('/user/1/pointslog');
  expect(response.statusCode).toBe(200);
});

// Test getting all classes
test('GET /class', async () => {
  const response = await request(app).get('/class');
  expect(response.statusCode).toBe(200);
});

// Test getting class by id
test('GET /class/:id', async () => {
  const response = await request(app).get('/class/1');
  expect(response.statusCode).toBe(200);
  expect(response.body.id).toBe(1);
});

// POST
// Test creating a new user
test('POST /user', async () => {
  const response = await request(app)
	.post('/user')
	.send({ 
	  username: 'test', 
	  password: 'password', 
	  isStudent: true, 
	  isTeacher: false 
	});

  expect(response.statusCode).toBe(201);
  expect(response.body.username).toBe('test');
});

// Test creating a new class
test('POST /class', async () => {
  const response = await request(app)
	.post('/class')
	.send({ 
		category: 'Test Category', 
		class_name: 'Test Class', 
		class_time: '09:00:00',
		duration: 60, 
		description: 'This is a description of the test class.' 
	});

  expect(response.statusCode).toBe(201);
  expect(response.body.class_name).toBe('Test Class');
});

// PUT
// Test updating a user
test('PUT /user/:id', async () => {
	const response = await request(app)
	  .put('/user/1')
	  .send({ 
	    username: 'updated', 
	    password: 'updatedpassword',
	    isStudent: true, 
	    isTeacher: false 
	  });

	expect(response.statusCode).toBe(200);
	expect(response.body.username).toBe('updated');
	expect(response.body.isStudent).toBe(true);
});

// Test updating a class
test('PUT /class/:id', async () => {
	const response = await request(app)
	  .put('/class/1')
	  .send({
		category: 'Updated Category',
		class_name: 'Updated Class',
		class_time: '10:00:00',
		duration: 120,
		description: 'This is an updated description of the class.'
	  });

	expect(response.statusCode).toBe(200);
	expect(response.body.class_name).toBe('Updated Class');
});

// DELETE
// Test deleting a user
test('DELETE /user/:id', async () => {
	const response = await request(app).delete('/user/1');
	expect(response.statusCode).toBe(200);
});

// Test deleting a class
test('DELETE /class/:id', async () => {
	const response = await request(app).delete('/class/1');
	expect(response.statusCode).toBe(200);
});
