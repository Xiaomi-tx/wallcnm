const {
  MONGODB_PORT,
  MONGODB_HOST
} = require("../config/app.config")
const mongoose = require("mongoose");
// 连接服务器
mongoose.connect(`mongodb://${MONGODB_HOST}/wall`);

// 配置连接是否成功

module.exports = mongoose