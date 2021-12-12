const {
  FeLetter
} = require("../model/frontendLetter.model")


class FeLetterService {
  async setFeLetter(body) {
    let fe = new FeLetter(body)
    return fe.save();
  }
  async getFeLetter(query) {
    let offset = +query.offset;
    let size = +query.size;

    !size && (size = 100);
    !offset && (offset = 0);
    
    return FeLetter.find().limit(size).skip(offset);
  }
  async getIdLetter(id) {
    console.log(id);
    return FeLetter.findById(id)
  }
  async removeLetter(id) {
    return FeLetter.deleteOne({_id: id})
  }
}


module.exports = new FeLetterService();