import pg from "pg";
const { Pool } = pg;

const pool = new Pool();
// DATABASE_URL=postgres://username:password@localhost:5432/database_name
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });
export default {
  query: (text, params) => pool.query(text, params),
};
