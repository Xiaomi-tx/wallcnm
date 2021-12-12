const Nickname = require("../model/nickname.model");

const setNickNameService = (username, photo) => {
  let isGiveLike = false;
  let nickname = new Nickname({
    name: username,
    photo,
    isGiveLike
  })
  return nickname.save();
}

const getNickNameService = (username) => {
  return Nickname.find({name: username});
}

const getAllNickNameService = () => {
  return Nickname.find();
}


module.exports = {
  setNickNameService,
  getNickNameService,
  getAllNickNameService
};