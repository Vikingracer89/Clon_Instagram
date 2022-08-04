require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const {
  controlNewUser,
  controlGetUser,
  controlLogin,
} = require("./controllers/users");

const {
  controlGetPhotos,
  controlNewPhoto,
  controlGetPhotoByID,
  controlDeletePhoto,
} = require("./controllers/photos");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//RUTAS

//Rutas de usuarios
app.post("/users", controlNewUser);
app.get("/users/:id", controlGetUser);
app.post("/login", controlLogin);

//Rutas de photos
app.post("/", controlGetPhotos);
app.get("/", controlNewPhoto);
app.get("/photos/:id", controlGetPhotoByID);
app.delete("/photos/:id", controlDeletePhoto);

//MIDDLEWARE 404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not Found",
  });
});

//MIDDLEWARE ERRORES
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

app.listen(3000, () => {
  //console.log("servidor ON");
});
