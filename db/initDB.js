const { getConnection } = require('./db');

async function addDummyData() {
  const connection = await getConnection();

  await connection.query(`
    INSERT INTO users(email,password)
    VALUES('test@test.com', 'password')`);
}

async function initDB() {
  let connection;

  try {
    connection = await getConnection();

    console.log('Borrando tablas existentes');
    await connection.query('DROP TABLE IF EXISTS posts');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creando tablas');
    await connection.query(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
      );
    `);

    await connection.query(`
      CREATE TABLE posts (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        text VARCHAR (200) NOT NULL,
        image VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        );
    `);

    await connection.query(`
       CREATE TABLE likes (
         id INT PRIMARY KEY AUTO_INCREMENT,
         user_id INT NOT NULL,
         post_id INT NOT NULL,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
       );
     `);

    await addDummyData();
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    // eslint-disable-next-line no-undef
    process.exit();
  }
}

initDB();
