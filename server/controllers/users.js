const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/Users");
const Token = require("../models/Token");

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Unable to fetch users." });
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await User.getById(id);
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: "User not found." });
        }
    }


    static async getUserByUsername(req, res) {
        const { username } = req.body;
        try {
            const user = await User.getByUsername(username);
            console.log(user);
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(404).json({ error: "User not found." });

        }
    }

    static async getUserByEmail(req, res) {
        const { email } = req.body;
        console.log(email);
        try {
            const user = await User.getByEmail(email);
            console.log(user);
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(404).json({ error: "User not found." });

        }
    }

    static async createUser(req, res) {
        const { email, username, password, isStudent, isTeacher } = req.body;
        try {
            const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
            const salt = await bcrypt.genSalt(rounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await User.create({
                email,
                username,
                password: hashedPassword,
                isStudent,
                isTeacher,
            });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: "Unable to create user." });
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        const { username, password, isStudent, isTeacher } = req.body;
        try {
            const user = await User.getById(id);
            user.username = username;
            user.password = password;
            user.isStudent = isStudent;
            user.isTeacher = isTeacher;
            await user.update();
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: "User not found." });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await User.getById(id);
            await user.delete();
            res.json({ message: "User deleted successfully." });
        } catch (error) {
            res.status(404).json({ error: "User not found." });
        }
    }


    static async register(req, res) {
        const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
        try {
            const data = req.body;
            const salt = await bcrypt.genSalt(rounds);
            data.password = await bcrypt.hash(data.password, salt);
            const result = await User.create(data);
            res.status(201).send(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }

    static async login(req, res) {
        const data = req.body;
        console.log(data);
        try {
            const user = await User.getByUsername(data.username);
            const authenticated = await bcrypt.compare(data.password, user.password);
            if (!authenticated) {
                throw new Error("Wrong username or password");
            } else {
                const token = await Token.create(user.id);
                const userId = user.id;
                localStorage.setItem("token", token.token);
                localStorage.setItem("userId", userId);
                res.status(200).json({ authenticated: true, user, token: token.token });
            }
        } catch (error) {
            res.status(403).json({ error: error.message });
        }
    }

    static async logout(req, res) {
        try {
            const token = req.headers.authorization;

            await Token.deleteByToken(token);

            res.status(200).json({ message: "Logged out successfully." });
        } catch (error) {
            res.status(500).json({ error: "Unable to logout." });
        }
    }


}

module.exports = UserController;