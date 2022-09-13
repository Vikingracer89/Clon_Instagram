require('dotenv').config();

const { getConnection } = require('./db');

async function main() {
  let connection;

  try {
    connection = await getConnection();

    //¡¡¡ESTO BORRA LA DB USAR SOLO EN PRUEBAS!!!
    //console.log('Borrando tablas existentes');
    //await connection.query('DROP TABLE IF EXISTS likes');
    //await connection.query('DROP TABLE IF EXISTS photo');
    //await connection.query('DROP TABLE IF EXISTS users');
    //¡¡¡ESTO BORRA LA DB USAR SOLO EN PRUEBAS!!!

    //console.log('Creando tablas');

    await connection.query(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE photo (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        text VARCHAR(280) NOT NULL,
        image VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);

    await connection.query(`
       CREATE TABLE likes (
         id INT PRIMARY KEY AUTO_INCREMENT,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
         photo_id INT NOT NULL,
         FOREIGN KEY (photo_id) REFERENCES photo(id),
         user_id INT NOT NULL,
         FOREIGN KEY (user_id) REFERENCES users(id)
         CONSTRAINT uc_user_photo UNIQUE (user_id , photo_id)
       );
     `);
  } catch (error) {
    //console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
