const mongoose = require("../app/db");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// 定义 规则
var giveLikeSchema = mongoose.Schema({
  lovewallId: mongoose.Schema.ObjectId,
  count: Number,
  isGiveLike: Object,
  name: String,
});
// 定义 模型
var GiveLike = mongoose.model('givelike', giveLikeSchema);

module.exports = {
  GiveLike,
};