// const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const createPost = async (userId, text, image = '') => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      INSERT INTO posts(user_id,text,image)
      VALUES(?,?,?)
    `,
      [userId, text, image]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const getAllPosts = async () => {
  return [];
};

module.exports = {
  createPost,
  getAllPosts,
  // getPostById,
  // detelePostById,
  // getPostByText,
};
