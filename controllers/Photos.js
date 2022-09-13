const {
  createPhoto,
  getAllPhotos,
  getPhotoById,
  detelePhotoById,
  getPhotoByText,
} = require('../db/Photos');
const { generateError, createPathIfNotExists } = require('../helpers');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');

const getPhotosController = async (req, res, next) => {
  try {
    const photos = await getAllPhotos();

    res.send({
      status: 'ok',
      data: photos,
    });
  } catch (error) {
    next(error);
  }
};

const newPhotoController = async (req, res, next) => {
  try {
    const { text } = req.body;

    //Compruebo que exista una imagen
    if (!req.files.image && !req.text) {
      throw generateError('Debes postear una foto con un texto', 400);
    }
    let imageFileName;

    if (req.files && req.files.image) {
      // Creo el path del directorio uploads
      const uploadsDir = path.join(__dirname, '../uploads');

      // Creo el directorio si no existe
      await createPathIfNotExists(uploadsDir);

      // Procesar la imagen a una altura de 100px y ancho autoescalado
      const image = sharp(req.files.image.data);
      image.resize({ height: 100 });

      // Guardo la imagen con un nombre aleatorio en el directorio uploads
      imageFileName = `${nanoid(24)}.jpg`;

      await image.toFile(path.join(uploadsDir, imageFileName));
    }

    const id = await createPhoto(req.userId, text, imageFileName);

    res.send({
      status: 'ok',
      message: `Post con id: ${id} creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

const getSinglePhotoController = async (req, res, next) => {
  try {
    const { text } = req.params;
    const photo = await getPhotoByText(text);

    res.send({
      status: 'ok',
      data: photo,
    });
  } catch (error) {
    next(error);
  }
};

const deletePhotoController = async (req, res, next) => {
  try {
    //req.userId
    const { id } = req.params;

    // Conseguir la información del post que quiero borrar
    const photo = await getPhotoById(id);

    // Comprobar que el usuario del token es el mismo que creó el post
    if (req.userId !== photo.user_id) {
      throw generateError(
        'Estás intentando borrar un post que no es tuyo',
        401
      );
    }

    // Borrar el post
    await detelePhotoById(id);

    res.send({
      status: 'ok',
      message: `El post con id: ${id} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPhotosController,
  newPhotoController,
  getSinglePhotoController,
  deletePhotoController,
};
