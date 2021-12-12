const UploadModel = require("../model/upload.model");

const uploadService = (photo, name) => {
  let upload = new UploadModel({
    photo,
    name
  })
  return upload.save();
}

const getNameService = (name) => {
  let res = UploadModel.find({name});
  return res;
}

const updatePhotoService = (name, photo) => {
  let res = UploadModel.findOneAndUpdate({name: name}, {
    $set: {photo: photo}
  })
  return res;
}




module.exports = {
  uploadService,
  getNameService,
  updatePhotoService
};