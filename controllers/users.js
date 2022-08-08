const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");
const { createUser, getUserById, getUserByemail } = require("../db/usersDB");

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
    const { id } = req.params;

    const user = await getUserById(id);
    res.send({
      status: "ok",
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

const controlLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError("Tienes que poner un email y una contraseña", 400);
    }

    const user = await getUserByemail(email);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError(
        "El usuario o la contraseña contraseña no son validos",
        401
      );
    }

    const payload = { id: user.id };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });

    res.send({
      status: "ok",
      data: token,
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
