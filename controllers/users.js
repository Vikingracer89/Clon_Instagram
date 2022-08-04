const { generateError } = require("../helpers");
const { createUser } = require("../db/usersDB");

const controlNewUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //falta implementar joi
    if (!email || !password) {
      throw generateError("Tienes que poner un email y una contraseña", 400);
    }

    const id = await createUser(email, password);

    res.send({
      status: "ok",
      message: `User created with id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const controlGetUser = async (req, res, next) => {
  try {
    res.send({
      status: "error",
      message: "Not implemented yet",
    });
  } catch (error) {
    next(error);
  }
};

const controlLogin = async (req, res, next) => {
  try {
    res.send({
      status: "error",
      message: "Not implemented yet",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  controlNewUser,
  controlGetUser,
  controlLogin,
};
