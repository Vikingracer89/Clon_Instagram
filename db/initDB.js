nrequire('dotenv').config();

const { getConnection } = require('./db');

async function main() {
  let connection;

  try {
    connection = await getConnection();
    
    console.log('Borrando tablas existentes');
     await connection.query('DROP TABLE IF EXISTS posts')
   await connection.query('DROP TABLE IF EXISTS users')

     console.log('Creando tablas');
    await connection.query(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE posts (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        text VARCHAR (200) NOT NULL,
        image VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES user(id)
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
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
