const { getAllPhotos, getPhotosByText } = require("../db/photosDB");

const controlGetPhotos = async (req, res, next) => {
  try {
    const Photos = await getAllPhotos();
    res.send({
      status: "ok",
      data: Photos,
    });
  } catch (error) {
    next(error);
  }
};

const controlNewPhoto = async (req, res, next) => {
  try {
    res.send({
      status: "error",
      message: "Not implemented yet",
    });
  } catch (error) {
    next(error);
  }
};

const controlGetPhotoByText = async (req, res, next) => {
  try {
    const { text } = req.params;

    const photo = await getPhotosByText(text);
    res.send({
      status: "ok",
      message: photo,
    });
  } catch (error) {
    next(error);
  }
};

const controlDeletePhoto = async (res, req, next) => {
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
  controlGetPhotos,
  controlNewPhoto,
  controlGetPhotoByText,
  controlDeletePhoto,
};
