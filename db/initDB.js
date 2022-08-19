require("dotenv").config();

//console.log(process.env);

const { getConnection } = require("./db");

async function main() {
  //console.log("main");
  let connection;

  try {
    connection = await getConnection();

    //USAR SOLO PARA PRUEBAS CON LA API

    //console.log("borrando tablas existentes")

    //await connection.query('DROP TABLE IF EXISTS photos')
    //await connection.query('DROP TABLE IF EXISTS users')

    //Creacion de tablas desde codigo

    //console.log("creando tablas");
    await connection.query(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR (100) UNIQUE NOT NULL,
            password VARCHAR (100) NOT NULL
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
    await connection.query(`
        CREATE TABLE photos (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            user_id INTEGER NOT NULL,
            photo VARCHAR(100) NOT NULL
            text VARCHAR (200),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            FOREING KEY (user_id) REFERENCES users(id)
        );
    `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
