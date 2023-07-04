require("dotenv").config()
const { Pool } = require('pg')


console.log(process.env.DB_URL);
const db = new Pool({
	connectionString: "postgres://pbozhwnh:6qvl3emysp9vDFm3LpNfFxvp66deEbEC@tyke.db.elephantsql.com/pbozhwnh"
})


module.exports = db
