const {
  GiveLike
} = require("../model/givelike.model");
const {
  getIdLetterService,
  updateLetterCountService
} = require("./lovewall.server");

const {
  updateGiveLikeService,
  getAllNickNameService
} = require("./nickname.service");

const mongoose = require("../app/db")



const setGiveLikeService = async (id, username) => {
  // 1. 获取所有用户信息
  let res = await getAllNickNameService();
  let obj = res.reduce((obj, data) => {
    obj[data.name] = false;
    return obj;
  }, {})

  // 2. 存储每个用户可点赞权
  let givelike = new GiveLike({
    lovewallId: id,
    count: 0,
    isGiveLike: obj,
    name: username
  })
  givelike.save();
}


const updateisGiveLikeService = async (name) => {
  let res = 'isGiveLike.' + name;
  let obj = {
    $set: {[res]: false}
  };
  await GiveLike.updateMany({}, obj);
}

const givelikeService = async (id, name) => {
  var _id = mongoose.Types.ObjectId(id);
  let [givelike] = await GiveLike.find({'lovewallId': _id});
  console.log(givelike);
  let bol = givelike.isGiveLike[name];
  bol = !bol;
  console.log(name);

  let str = 'isGiveLike.' + [name];
  let res = await GiveLike.updateOne({'lovewallId': _id}, {$set: {[str]: bol}})
  let count = givelike.count;
  if (bol) {
    count++;
  } else {
    count--;
  }

  await GiveLike.updateOne({'lovewallId': _id}, {$set: {'count': count}})
  await GiveLike.updateOne({'lovewallId': _id}, {$set: {'count': count}})
  return {
    bol,
    count,
    id
  };
}

const removeGiveLikeService = async (id) => {
  return GiveLike.deleteOne({"lovewallId": id})
}

const getGiveLikeService = () => {
  return GiveLike.find();
}


module.exports = {
  setGiveLikeService,
  updateisGiveLikeService,
  givelikeService,
  getGiveLikeService,
  removeGiveLikeService
}