const Token = require('../models/Token');

class TokenController {
    static async getOneByToken(req, res) {
        try {
            const { token } = req.params;
            const tokenObj = await Token.getOneByToken(token);
            res.json(tokenObj);
        } catch (error) {
            res.status(404).json({ error: 'Token not found.' });
        }
    }
}

module.exports = TokenController;
