const bcrypt = require("bcrypt");
const { generateError } = require("../helpers");
const { getConnection } = require("./db");

const createUser = async (email, password) => {
  let connection;

  try {
    connection = await getConnection();
    const [user] = await connection.query(
      `
    SELECT id FROM users WHERE email = ?
    `,
      [email]
    );

    if (user.length > 0) {
      throw generateError(
        "El usuario ya esta registrado con anterioridad",
        409
      );
    }

    const encryptPwd = await bcrypt.hash(password, 8);
    const [newUser] = await connection.query(
      `
    INSERT INTO users (email, password) VALUES (?, ?)
    `,
      [email, encryptPwd]
    );

    return newUser.insertId;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = {
  createUser,
};
