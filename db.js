const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "mlypstsql",
  host: "localhost",
  port: 5432,
  database: "prompt"
});

module.exports = pool;
