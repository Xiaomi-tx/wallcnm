const {
  LoveWall,
} = require("../model/lovewall.model");
const mongoose = require("../app/db")



const setLetterService = (params, username) => {
  username && (params.name = username);
  let lovewall = new LoveWall(params)
  return lovewall.save();
}

const getLetterService = ({offset, size}) => {
  offset = +offset;
  size = +size;

  
  let aDisposeData = [
    {
      $lookup: {
        from: "uploads",
        localField:"name",
        foreignField: "name",
        as: "userMessage",
      },
    },
    {
      $lookup: {
        from: "nicknames",
        localField:"name",
        foreignField: "name",
        as: "user",
      },
    },
    {
      $project: {
        "userMessage._id": 0,
        "userMessage.__v": 0,
        "userMessage.name": 0
      }
    }
  ];
  !isNaN(offset) && aDisposeData.push(
      {
        $skip: offset
      }
  );
  !isNaN(size) && aDisposeData.push(
    {
      $limit: size
    }
  );

  return LoveWall.aggregate(aDisposeData)
}


const updateLetterService = ({id, message, photos}, name) => {
  id = mongoose.Types.ObjectId(id);
  return LoveWall.findOneAndUpdate({"_id": id, "name": name}, {$set: { 'message': message, 'photos': photos }});
}

const assignLetterService = (name) => {
let reg = new RegExp(`${name}`);
return LoveWall.aggregate([
    {
      $lookup: {
        from: "uploads",
        localField:"name",
        foreignField: "name",
        as: "userMessage",
      },
    },
    {
      $lookup: {
        from: "nicknames",
        localField:"name",
        foreignField: "name",
        as: "user",
      },
    },
    {
      $project: {
        "userMessage._id": 0,
        "userMessage.__v": 0,
        "userMessage.name": 0
      }
    },
    {
      $match: {
        name: reg
      }
    }
  ])
}

const getIdLetterService = (id) => {
  return LoveWall.find({_id: id});
}

const updateLetterCountService = (id, count) => {
  return LoveWall.findByIdAndUpdate(id, {dot: count})
}

const removeLetterService = (id) => {
  return LoveWall.deleteOne({_id: id})
}

module.exports = {
  setLetterService,
  getLetterService,
  updateLetterService,
  assignLetterService,
  getIdLetterService,
  updateLetterCountService,
  removeLetterService
};