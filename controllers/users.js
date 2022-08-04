const { generateError } = require("../helpers");

const controlNewUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //falta implementar joi
    if (!email || !password) {
      throw generateError("Tienes que poner un email y una contraseña", 400);
    }

    res.send({
      status: "error",
      message: "Not implemented yet",
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
