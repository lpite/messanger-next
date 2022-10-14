import { Pool } from "pg";


let conn;

declare global {
  var conn: Pool
}


if (!global.conn) {
  conn = new Pool({
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    port: parseInt(process.env.PGSQL_PORT || "5432"),
    database: process.env.PGSQL_DATABASE,
  });
  global.conn = conn;

}

export default global.conn;
