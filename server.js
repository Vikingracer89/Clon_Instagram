require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const {
  newUserController,
  getUserController,
  loginController,
} = require('./controllers/users');

const {
  getPhotosController,
  newPhotoController,
  getSinglePhotoController,
  deletePhotoController,
} = require('./controllers/Photos');

const { authUser } = require('./middlewares/auth');
const likePhoto = require('./controllers/likeEntry');
//falta middleware cors
const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads'));

//Rutas de usuario
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.post('/user/login', loginController);

//Rutas de post
app.post('/photos', authUser, newPhotoController);
app.get('/photos', getPhotosController);
app.get('/photos/:id', authUser, getSinglePhotoController);
app.delete('/photos/:id', authUser, deletePhotoController);
app.post('/photos/:id/like', authUser, likePhoto);

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// Middleware de gestión de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

// Lanzamos el servidor
app.listen(3000, () => {
  console.log('Servidor funcionando! 👻');
});
