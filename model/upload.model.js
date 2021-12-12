const mongoose = require("../app/db");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// 定义 规则
var uploadSchema = mongoose.Schema({
  photo: String,
  name: String
});

// 定义 模型
var UpladModel = mongoose.model('upload', uploadSchema);


module.exports = UpladModel;