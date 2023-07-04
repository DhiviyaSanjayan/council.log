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

    it('POST /class', async () => {
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

    it('GET /class', async () => {
      const response = await request(app).get('/class');
      expect(response.statusCode).toBe(200);
    });

    it('GET /class/:id', async () => {
      const response = await request(app).get('/class/4');
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(1);
    });


    it('PUT /class/:id', async () => {
      const response = await request(app)
        .put('/class/4')
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

    it('DELETE /class/:id', async () => {
      const response = await request(app).delete('/class/4');
      expect(response.statusCode).toBe(200);
    });
  });
});
