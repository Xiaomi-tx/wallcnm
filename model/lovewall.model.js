const mongoose = require("../app/db");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// 定义 规则
var loveWallSchema = mongoose.Schema({
  message: String,
  time: String,
  name: String,
  photos: Array
});
// 定义 模型
var LoveWall = mongoose.model('lovewall', loveWallSchema);

module.exports = {
  LoveWall,
};