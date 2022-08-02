require("dotenv").config();

//console.log(process.env);

const { getConnection } = require("./db");

async function main() {
  //console.log("main");
  let connection;

  try {
    connection = await getConnection();

    //console.log("creando tablas");
    await connection.query(`
        CREATE TABLE users ()
    `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
