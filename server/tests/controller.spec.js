const request = require('supertest');
const app = require('../api');

const ClassesController = require("../controllers/classes.js");
const PointsLogController = require("../controllers/pointslog.js");
const RegistrationController = require("../controllers/registration.js");
const TokenController = require("../controllers/token.js");
const UserController = require("../controllers/users.js");

const Class = require('../models/Classes');
const PointsLog = require('../models/PointsLog');
const Registration = require('../models/Registration');
const Token = require("../models/Token");
const User = require("../models/Users");

jest.mock('../models/Classes');
jest.mock('../models/PointsLog');
jest.mock('../models/Registration');
jest.mock('../models/Token');
jest.mock('../models/Users');
jest.mock('bcrypt', () => ({
    genSalt: jest.fn(() => Promise.resolve('randomSalt')),
    hash: jest.fn(() => Promise.resolve('hashedPassword')),
}));


describe("ClassesController", () => {
    const mockRequest = (data, paramsData = {}) => ({
        params: paramsData,
        body: data
    });

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getAllUsers returns users", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const usersData = [{ id: 1, username: 'test' }];
        User.getAll.mockResolvedValue(usersData);

        await UserController.getAllUsers(req, res);

        expect(res.json).toHaveBeenCalledWith(usersData);
    });

    test("getUserById returns a user", async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        const userData = { id: 1, username: 'test' };
        User.getById.mockResolvedValue(userData);

        await UserController.getUserById(req, res);

        expect(res.json).toHaveBeenCalledWith(userData);
    });

    test("createUser creates and returns a user", async () => {
        const req = mockRequest({
            email: 'test@example.com',
            username: 'test',
            password: 'password',
            isStudent: true,
            isTeacher: false,
        });
        const res = mockResponse();

        const userData = { id: 1, username: 'test', password: 'password', isStudent: true, isTeacher: false };
        User.create.mockResolvedValue(userData);

        await UserController.createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(userData);
    });

    test("deleteUser deletes a user", async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        const userData = { id: 1, username: 'test', password: 'password', isStudent: true, isTeacher: false, delete: jest.fn().mockResolvedValue() };
        User.getById.mockResolvedValue(userData);

        await UserController.deleteUser(req, res);

        expect(userData.delete).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully.' });
    });

    test("getAllClasses returns classes", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const classesData = [{ id: 1, class_name: 'Math' }];
        Class.getAll.mockResolvedValue(classesData);

        await ClassesController.getAllClasses(req, res);

        expect(res.json).toHaveBeenCalledWith(classesData);
    });

    test("getClassById returns a class", async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        const classData = { id: 1, class_name: 'Math' };
        Class.getById.mockResolvedValue(classData);

        await ClassesController.getClassById(req, res);

        expect(res.json).toHaveBeenCalledWith(classData);
    });

    test("createClass creates and returns a class", async () => {
        const req = mockRequest({
            category: 'Math',
            class_name: 'Math 101',
            class_time: '10:00 AM',
            address: '123 St',
            duration: 60,
            description: 'Math class',
            teacher_id: 1
        });
        const res = mockResponse();

        const classData = { id: 1, class_name: 'Math 101' };
        const mockClassInstance = { create: jest.fn().mockResolvedValue(classData) };
        Class.mockImplementation(() => mockClassInstance);

        await ClassesController.createClass(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(classData);
    });

    test("updateClass updates and returns a class", async () => {
        const req = mockRequest({
            category: 'Math',
            class_name: 'Math 101',
            class_time: '10:00 AM',
            address: '123 St',
            duration: 60,
            description: 'Math class',
            teacher_id: 1
        }, { id: 1 });
        const res = mockResponse();

        const classData = { id: 1, class_name: 'Math 101', update: jest.fn().mockResolvedValue() };
        Class.getById.mockResolvedValue(classData);

        await ClassesController.updateClass(req, res);

        expect(classData.update).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(classData);
    });

    test("deleteClass deletes a class", async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        const classData = { id: 1, class_name: 'Math 101', delete: jest.fn().mockResolvedValue() };
        Class.getById.mockResolvedValue(classData);

        await ClassesController.deleteClass(req, res);

        expect(classData.delete).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ message: 'Class deleted successfully.' });
    });
});



describe("PointsLogController", () => {
    const mockRequest = (data, paramsData = {}) => ({
        params: paramsData,
        body: data
    });

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getAllPointsLogs returns logs", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const pointsLogsData = [{ id: 1, userId: 1, points: 10 }];
        PointsLog.getAll.mockResolvedValue(pointsLogsData);

        await PointsLogController.getAllPointsLogs(req, res);

        expect(res.json).toHaveBeenCalledWith(pointsLogsData);
    });

    test("getPointsLogById returns a log", async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        const pointsLogData = { id: 1, userId: 1, points: 10 };
        PointsLog.getById.mockResolvedValue(pointsLogData);

        await PointsLogController.getPointsLogById(req, res);

        expect(res.json).toHaveBeenCalledWith(pointsLogData);
    });

    test("createPointsLog creates and returns a log", async () => {
        const req = mockRequest({ userId: 1, points: 10, role: 'user' });
        const res = mockResponse();

        const pointsLogData = { id: 1, userId: 1, points: 10 };
        PointsLog.create.mockResolvedValue(pointsLogData);

        await PointsLogController.createPointsLog(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(pointsLogData);
    });

    test("updatePointsLog updates and returns a log", async () => {
        const req = mockRequest({ userId: 1, points: 20, role: 'user' }, { id: 1 });
        const res = mockResponse();

        const pointsLogData = { id: 1, userId: 1, points: 10, role: 'user', update: jest.fn().mockResolvedValue() };
        PointsLog.getById.mockResolvedValue(pointsLogData);

        await PointsLogController.updatePointsLog(req, res);

        expect(pointsLogData.update).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(pointsLogData);
    });

    test("deletePointsLog deletes a log", async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        const pointsLogData = { id: 1, userId: 1, points: 10, role: 'user', delete: jest.fn().mockResolvedValue() };
        PointsLog.getById.mockResolvedValue(pointsLogData);

        await PointsLogController.deletePointsLog(req, res);

        expect(pointsLogData.delete).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ message: 'Points log deleted successfully.' });
    });
});





describe("RegistrationController", () => {
    const mockRequest = (data, paramsData = {}) => ({
        params: paramsData,
        body: data
    });

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getAllRegistrations returns registrations", async () => {
        const req = mockRequest();
        const res = mockResponse();

        const registrationsData = [{ id: 1, userId: 1, classId: 1, role: 'student' }];
        Registration.getAll.mockResolvedValue(registrationsData);

        await RegistrationController.getAllRegistrations(req, res);

        expect(res.json).toHaveBeenCalledWith(registrationsData);
    });

    test("getRegistrationById returns a registration", async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        const registrationData = { id: 1, userId: 1, classId: 1, role: 'student' };
        Registration.getById.mockResolvedValue(registrationData);

        await RegistrationController.getRegistrationById(req, res);

        expect(res.json).toHaveBeenCalledWith(registrationData);
    });

    test("createRegistration creates and returns a registration", async () => {
        const req = mockRequest({ userId: 1, classId: 1, role: 'student' });
        const res = mockResponse();

        const registrationData = { id: 1, userId: 1, classId: 1, role: 'student' };
        Registration.create.mockResolvedValue(registrationData);

        await RegistrationController.createRegistration(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(registrationData);
    });

    test("updateRegistration updates and returns a registration", async () => {
        const req = mockRequest({ userId: 1, classId: 1, role: 'student' }, { id: 1 });
        const res = mockResponse();

        const registrationData = { id: 1, userId: 1, classId: 1, role: 'student', update: jest.fn().mockResolvedValue() };
        Registration.getById.mockResolvedValue(registrationData);

        await RegistrationController.updateRegistration(req, res);

        expect(registrationData.update).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(registrationData);
    });

    test("deleteRegistration deletes a registration", async () => {
        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        const registrationData = { id: 1, userId: 1, classId: 1, role: 'student', delete: jest.fn().mockResolvedValue() };
        Registration.getById.mockResolvedValue(registrationData);

        await RegistrationController.deleteRegistration(req, res);

        expect(registrationData.delete).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ message: 'Registration deleted successfully.' });
    });
});



describe("TokenController", () => {
    const mockRequest = (data) => ({
        body: data
    });

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getOneByToken returns a user", async () => {
        const req = mockRequest({ token: 'testToken' });
        const res = mockResponse();

        const tokenData = { user_id: 1 };
        const userData = { id: 1, name: 'testUser' };
        Token.getOneByToken.mockResolvedValue(tokenData);
        User.getById.mockResolvedValue(userData);

        await TokenController.getOneByToken(req, res);

        expect(Token.getOneByToken).toHaveBeenCalledWith('testToken');
        expect(User.getById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(userData);
    });
});




// Mocking bcrypt for user password hashing
jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('hashed_password')),
  compare: jest.fn(() => Promise.resolve(true)),
}));

describe("UserController", () => {
	const mockRequest = (data, paramsData = {}) => ({
		params: paramsData,
		body: data
	});

	const mockResponse = () => {
		const res = {};
		res.status = jest.fn().mockReturnValue(res);
		res.json = jest.fn().mockReturnValue(res);
		return res;
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("getAllUsers returns users", async () => {
		const req = mockRequest();
		const res = mockResponse();

		const usersData = [{ id: 1, username: 'testuser' }];
		User.getAll.mockResolvedValue(usersData);

		await UserController.getAllUsers(req, res);

		expect(res.json).toHaveBeenCalledWith(usersData);
	});

	test("getUserById returns a user", async () => {
		const req = mockRequest({}, { id: 1 });
		const res = mockResponse();

		const userData = { id: 1, username: 'testuser' };
		User.getById.mockResolvedValue(userData);

		await UserController.getUserById(req, res);

		expect(res.json).toHaveBeenCalledWith(userData);
	});

	test("createUser creates and returns a user", async () => {
		const req = mockRequest({
			first_name: 'John',
			last_name: 'Doe',
			email: 'john.doe@example.com',
			username: 'testuser', 
			password: 'password', 
			isStudent: true, 
			isTeacher: false 
		});
		const res = mockResponse();

		const userData = { id: 1, username: 'testuser' };
		User.create.mockResolvedValue(userData);

		await UserController.createUser(req, res);

		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith(userData);
	});

	test("updateUser updates and returns a user", async () => {
		const req = mockRequest({
			username: 'updateduser', 
			password: 'updatedpassword',
			email: 'updatedemail',
			isStudent: true, 
			isTeacher: false 
		}, { id: 1 });
		const res = mockResponse();

		const userData = { id: 1, username: 'updateduser', update: jest.fn().mockResolvedValue() };
		User.getById.mockResolvedValue(userData);

		await UserController.updateUser(req, res);

		expect(userData.update).toHaveBeenCalled();
		expect(res.json).toHaveBeenCalledWith(userData);
	});

	test("deleteUser deletes a user", async () => {
		const req = mockRequest({}, { id: 1 });
		const res = mockResponse();

		const userData = { id: 1, username: 'testuser', delete: jest.fn().mockResolvedValue() };
		User.getById.mockResolvedValue(userData);

		await UserController.deleteUser(req, res);

		expect(userData.delete).toHaveBeenCalled();
		expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully.' });
	});

	test("loginUser logs in a user and returns a token", async () => {
		const req = mockRequest({
			username: 'testuser', 
			password: 'password'
		});
		const res = mockResponse();

		const userData = { id: 1, username: 'testuser' };
		User.getByUsername.mockResolvedValue(userData);

		const tokenData = { userId: 1, token: 'randomtokenstring' };
		Token.create.mockResolvedValue(tokenData);

		await UserController.loginUser(req, res);

		expect(res.json).toHaveBeenCalledWith(tokenData);
	});

	test("logoutUser logs out a user", async () => {
		const req = mockRequest({}, { id: 1 });
		const res = mockResponse();

		const userData = { id: 1, username: 'testuser' };
		User.getById.mockResolvedValue(userData);

		const tokenData = { userId: 1, delete: jest.fn().mockResolvedValue() };
		Token.getByUserId.mockResolvedValue(tokenData);

		await UserController.logoutUser(req, res);

		expect(tokenData.delete).toHaveBeenCalled();
		expect(res.json).toHaveBeenCalledWith({ message: 'User logged out successfully.' });
	});
});
