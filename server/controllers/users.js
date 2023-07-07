const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const User = require("../models/Users");
const Token = require("../models/Token");
const Verification = require("../models/Verification");
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

  // static async register(req, res) {
  //   const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
  //   try {
  //     const data = req.body;
  //     console.log(data);
  //     const salt = await bcrypt.genSalt(rounds);
  //     data.password = await bcrypt.hash(data.password, salt);
  //     const result = await User.create(data);
  //     const verificationToken = (await Verification.create(result.id)).token;
  //     console.log(verificationToken);
  //     const url = `${process.env.BASE_URL}emailVerification/?token=${verificationToken}`;
  //     console.log(url);
  //     const sgApiKey = process.env.SENDGRID_API_KEY;
  //     sgMail.setApiKey(sgApiKey);

  //     await sgMail.send({
  //       to: result.email,
  //       from: `Florin Skills <${process.env.SENDER_EMAIL}>`,
  //       subject: "Verify your email",
  //       html: `<div style="width: 70%; margin: 0 auto; "><h6 style="font-size: 18px">Please verify your email by clicking the button:</h6>
  //         <a style="margin-top:1em; padding: 1em; background-color: #33b249; text-decoration: none ; color: white" href="${url}"> Verify Your Email</a></div>`,
  //     });
  //     res.status(201).send(result);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // }

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

  static async getUserTeacherId(req, res) {
    const { username } = req.body;
    try {
      const teacherId = await User.getUserTeacherId(username);
      res.json({ teacherId });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getUserClasses(req, res) {
    const { id } = req.params;
    try {
      const userClasses = await User.getClasses(id);
      res.json(userClasses);
    } catch (error) {
      res.status(404).json({ error: "Unable to fetch classes." });
    }
  }

  static async getUserPastClasses(req, res) {
    const { id } = req.params;
    try {
      const classes = await User.getPastClasses(id);
      console.log(classes); // add this line
      res.json(classes);
    } catch (error) {
      res.status(404).json({ error: "User not found." });
    }
  }

  static async getUserFutureClasses(req, res) {
    const { id } = req.params;
    try {
      const classes = await User.getFutureClasses(id);
      console.log(classes); // add this line
      res.json(classes);
    } catch (error) {
      res.status(404).json({ error: "User not found." });
    }
  }
  static async checkEmailToken(req, res) {
    const { token } = req.params;
    try {
      console.log("run");
      const verifiedToken = await Verification.getOneByToken(token);
      await Verification.deleteByToken(verifiedToken.token_id);
      await User.verifyUser(verifiedToken.user_id);
      res.status(200).json({ message: "Token is valid" });
    } catch (error) {
      res.status(400).json(error);
    }
  }


  static async partialUpdateUser(req, res) {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
      const user = await User.getById(id);

      if (username) {
        user.username = username;
      }

      if (email) {
        user.email = email;
      }

      if (password) {
        const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
        const salt = await bcrypt.genSalt(rounds);
        user.password = await bcrypt.hash(password, salt);
      }

      await user.patchUser();

      res.json({ message: "User information updated successfully." });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user information." });
    }
  }
}

module.exports = UserController;
