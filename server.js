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
  getPostsController,
  newPostController,
  getSinglePostController,
  deletePostController,
} = require('./controllers/Posts');

const { authUser } = require('./middlewares/auth');
// const likePost = require('./controllers/likeEntry');
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

//Rutas de posts
app.post('/', getPostsController);
app.post('/', authUser, newPostController);
app.get('/post/:id', getSinglePostController);
app.delete('/post/id', deletePostController);

//Rutas de photos
//app.get('/', getPhotosController);

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
  console.log('Servidor funcionando en el puerto 3000 👻');
});
