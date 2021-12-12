const mongoose = require("../app/db");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// 定义 规则
var feLetterSchema = mongoose.Schema({
  message: String,
  time: String,
  name: String,
  user: Array,
  givelike: Array,
  userMessage: Array,
  photo: Array,
});
// 定义 模型
var FeLetter = mongoose.model('fe_letter', feLetterSchema);

module.exports = {
  FeLetter,
};