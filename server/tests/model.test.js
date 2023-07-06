const User = require("../models/Users");
const Classes = require("../models/Classes");




const db = require('../database/db');

describe('Users Model', () => {
    // This is run before all tests
    beforeAll(async () => {
        // Create a new user
        await db.query(`
            INSERT INTO users (
                first_name, 
                last_name, 
                email, 
                username, 
                password, 
                is_student, 
                is_teacher
            ) VALUES (
                'Test', 
                'User', 
                'testuser@example.com', 
                'testuser', 
                'password',
                true,
                false
            )
        `);
    });

    // This is run after all tests
    afterAll(async () => {
        // Clean up the test database
        await db.query('DELETE FROM users');
    });

    it('should get all users', async () => {
        const users = await User.getAll();
        expect(users.length).toBeGreaterThan(0);
    });

    it('should get a user by id', async () => {
        const users = await User.getAll();
        const user = await User.getById(users[0].id);
        expect(user).not.toBeNull();
    });

    it('should get a user by username', async () => {
        const user = await User.getByUsername('testuser');
        expect(user).not.toBeNull();
    });

    it('should get a user by email', async () => {
        const user = await User.getByEmail('testuser@example.com');
        expect(user).not.toBeNull();
    });

    it('should create a user', async () => {
        const user = await User.create({
            first_name: 'Test2',
            last_name: 'User2',
            email: 'testuser2@example.com',
            username: 'testuser2',
            password: 'password',
            is_student: true,
            is_teacher: false,
        });
        expect(user).not.toBeNull();
    });

    it('should update a user', async () => {
        const users = await User.getAll();
        let user = users.find(u => u.username === 'testuser');
        user.firstName = 'Updated';
        user = await user.update();
        expect(user.firstName).toBe('Updated');
    });

    it('should delete a user', async () => {
        let users = await User.getAll();
        let user = users.find(u => u.username === 'testuser2');
        await user.delete();
        users = await User.getAll();
        user = users.find(u => u.username === 'testuser2');
        expect(user).toBeUndefined();
    });


});



describe('Classes Model', () => {
    // This is run before all tests
    beforeAll(async () => {
        // Create a new class
        await db.query(`
            INSERT INTO classes (
                category, 
                class_name, 
                class_time, 
                address, 
                duration, 
                description, 
                teacher_id
            ) VALUES (
                'Test Category', 
                'Test Class', 
                '2023-07-10 10:00:00', 
                'Test Address', 
                1,
                'Test Description',
                1
            )
        `);
    });

    // This is run after all tests
    afterAll(async () => {
        // Clean up the test database
        await db.query('DELETE FROM classes');
    });

    it('should get all classes', async () => {
        const classes = await Classes.getAll();
        expect(classes.length).toBeGreaterThan(0);
    });

    it('should get a class by id', async () => {
        const classes = await Classes.getAll();
        const clas = await Classes.getById(classes[0].id);
        expect(clas).not.toBeNull();
    });

    it('should create a class', async () => {
        const clas = await new Classes({
            category: 'Test Category 2',
            class_name: 'Test Class 2',
            class_time: '2023-07-11 10:00:00',
            address: 'Test Address 2',
            duration: 1,
            description: 'Test Description 2',
            teacher_id: 1
        }).create();
        expect(clas).not.toBeNull();
    });

    it('should update a class', async () => {
        let classes = await Classes.getAll();
        let clas = classes.find(c => c.className === 'Test Class');
        clas.className = 'Updated';
        clas = await clas.update();
        expect(clas.className).toBe('Updated');
    });

    it('should delete a class', async () => {
        let classes = await Classes.getAll();
        let clas = classes.find(c => c.className === 'Test Class 2');
        await clas.delete();
        classes = await Classes.getAll();
        clas = classes.find(c => c.className === 'Test Class 2');
        expect(clas).toBeUndefined();
    });

});
