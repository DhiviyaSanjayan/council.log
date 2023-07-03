const { v4: uuidv4 } = require("uuid");
const db = require("../database/db");

class Token {
    constructor({ token_id, user_id, token }) {
        this.token_id = token_id;
        this.user_id = user_id;
        this.token = token;
    }

    static async create(user_id) {
        const token = uuidv4();
        const query = "INSERT INTO tokens (user_id, token) VALUES ($1, $2) RETURNING token_id";
        const values = [user_id, token];
        const response = await db.query(query, values);
        const newID = response.rows[0].token_id;
        const newToken = await Token.getOneById(newID);
        return newToken;
    }

    static async getOneById(id) {
        const query = "SELECT * FROM tokens WHERE token_id = $1";
        const response = await db.query(query, [id]);
        if (response.rows.length !== 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async getOneByToken(token) {
        const query = "SELECT * FROM tokens WHERE token = $1";
        const response = await db.query(query, [token]);
        if (response.rows.length !== 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }
}

module.exports = Token;
