const mongoose = require("../app/db");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// 定义 规则
var NickNameSchema = mongoose.Schema({
  name: String,
  photo: String,
});

// 定义 模型
var Nickname = mongoose.model('nicknames', NickNameSchema);


module.exports = Nickname;