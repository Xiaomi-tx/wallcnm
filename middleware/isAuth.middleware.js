const jwt = require("jsonwebtoken");
const {
  publicKeys
} = require("../config/keys.config");
const {
  Error
} = require("../model/response.model");
const {
  getNickNameService
} = require("../service/nickname.service")
const isAuth = async (ctx, next) => {
  let token = ctx.header['x-jsonwebtoken-data'];
  if(!token) {
    ctx.body = new Error({
      status: 401,
      message: "请注册昵称！~谢谢~空你几哇~~"
    })
  }
  // 如果有token则去往下一个 中间件
  try {
    let { username } = jwt.verify(token, publicKeys);
    let res = await getNickNameService(username);
    if (res.length === 0) {
      ctx.body = new Error({
        status: 401,
        message: "请注册昵称！~谢谢~空你几哇~~"
      })
      return;
    }
    ctx.req.username = res[0].name;
    res && await next();
  } catch (error) {
    ctx.body = new Error({
      status: 401,
      message: "请注册昵称！~谢谢~空你几哇~~"
    })
  }
}

module.exports = isAuth