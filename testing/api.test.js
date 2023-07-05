const request = require('supertest');
const app = require('../server/api');



describe("Server Tests", () => {
  it('Server should respond to GET /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
  

  describe("User API", () => {
    it('GET /user/:id', async () => {
      const response = await request(app).get('/user/1');
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(1);
    });

    it('POST /user/register', async () => {
      const response = await request(app)
        .post('/user/register')
        .send({ 
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          username: 'testoftest', 
          password: 'password', 
          isStudent: true, 
          isTeacher: false 
        });
    
      expect(response.statusCode).toBe(201);
      expect(response.body.username).toBe('testoftest');
    });
    

    it('PUT /user/:id', async () => {
      const response = await request(app)
        .put('/user/5')
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

    it('DELETE /user/:id', async () => {
      const response = await request(app).delete('/user/5');
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Class API", () => {

    // Test to create a new class
    it('POST /class', async () => {
      const response = await request(app)
        .post('/class')
        .send({ 
          category: 'Test Category', 
          class_name: 'Test Class', 
          class_time: '09:00:00',
          duration: 60, 
          description: 'This is a description of the test class.',
          teacher_id: 1 // Assume that teacher with id 1 is available
        });
  
      expect(response.statusCode).toBe(201);
      expect(response.body.className).toBe('Test Class');
    });
  
    // Test to get all classes
    it('GET /class', async () => {
      const response = await request(app).get('/class');
      expect(response.statusCode).toBe(200);
    });
  
    // Test to get a class by id
    it('GET /class/:id', async () => {
      const response = await request(app).get('/class/1');
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(1);
    });
  
    // Test to update a class
    it('PUT /class/:id', async () => {
      const response = await request(app)
        .put('/class/1')
        .send({
          category: 'Updated Category',
          class_name: 'Updated Class',
          class_time: '10:00:00',
          duration: 120,
          description: 'This is an updated description of the class.',
          teacher_id: 2 // Assume that teacher with id 2 is available
        });
  
      expect(response.statusCode).toBe(200);
      expect(response.body.className).toBe('Updated Class');
      expect(response.body.teacherId).toBe(2);
    });
  
    // Test to delete a class
    it('DELETE /class/:id', async () => {
      const response = await request(app).delete('/class/1');
      expect(response.statusCode).toBe(200);
    });
  });
  


  describe("PointsLog API", () => {
    // Test to get all points logs
    it('GET /points', async () => {
      const response = await request(app).get('/points');
      expect(response.statusCode).toBe(200);
    });
  
    // Test to get a points log by id
    it('GET /points/:id', async () => {
      const response = await request(app).get('/points/1');
      expect(response.statusCode).toBe(200);
      expect(response.body.logId).toBe(1);
    });
  
    // Test to create a new points log
    it('POST /points', async () => {
      const response = await request(app)
        .post('/points')
        .send({
          userId: 1,
          points: 10,
          role: 'student'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.points).toBe(10);
      expect(response.body.role).toBe('student');
    });

    // Test to update a points log
    it('PUT /points/:id', async () => {
      const response = await request(app)
        .put('/points/1')
        .send({
          userId: 2,
          points: 20,
          role: 'teacher'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.points).toBe(20);
      expect(response.body.role).toBe('teacher');
    });

    // Test to delete a points log
    it('DELETE /points/:id', async () => {
      const response = await request(app).delete('/points/1');
      expect(response.statusCode).toBe(200);
    });
});





});
