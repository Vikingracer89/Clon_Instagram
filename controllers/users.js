const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");
const { createUser, getUserById, getUserByemail } = require("../db/usersDB");
const joi = require("@hapi/joi");
const Joi = require("@hapi/joi");

const controlNewUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const schema = joi.object().keys({
      email: Joi.email().required(),
      password: joi.string.min(4).max(10).required(),
    });
    const validation = schema.validate({ email, password });

    if (validation.error) {
      throw generateError("Los datos introducidos no son validos", 400);
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

    const schema = joi.number().positive().integer().requiered();
    const validation = schema.validate(req.params);

    if (validation.error) {
      throw generateError("El usuario debe ser un numero", 401);
    }

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

    const schema = joi.object().keys({
      email: Joi.email().required(),
      password: joi.string.min(4).max(10).required(),
    });
    const validation = schema.validate({ email, password });

    if (validation.error) {
      throw generateError("Los datos introducidos no son validos", 400);
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
