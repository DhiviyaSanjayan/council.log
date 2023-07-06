const Token = require("../models/Token");
const User = require("../models/Users");
class TokenController {
  static async getOneByToken(req, res) {
    try {
      const { token } = req.body;
      const tokenObj = await Token.getOneByToken(token);
      const user = await User.getById(tokenObj.user_id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: "Token not found." });
    }
  }
}

module.exports = TokenController;
