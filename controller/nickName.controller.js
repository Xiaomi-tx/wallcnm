const jwt = require("jsonwebtoken");
const {
  setNickNameService,
  getNickNameService
} = require("../service/nickname.service");
const { Success, Error } = require("../model/response.model");
const {
  privateKeys,
  publicKeys
} = require("../config/keys.config");
const {
  APP_HOST
} = require("../config/app.config")

const {
  updateisGiveLikeService
} = require("../service/givelike.service")

class NickNameController {
  // 设置昵称
  async setNickName(ctx, next) {
    // 验证用户是否重复登录
    let token = ctx.header['x-jsonwebtoken-data'];

    // 数据库没有该用户token还在 ----------------------------
    if (token) {
      let res = jwt.verify(token, publicKeys);
      let stopResult = await getNickNameService(res.username);
      if (stopResult.length === 0) {
        ctx.body = new Error({
          status: 401,
          message: "请注册哦！~，还有记得把本地存储清除一下下哦！~宝贝们！~"
        });
        return;
      }
    }

    // 重复注册 -----------------------
    let { username } = ctx.request.body;
    if (token || token && username) {
      ctx.body = new Error({
        status: 401,
        message: "请不要重复注册"
      });
      return;
    } 
    
    // 验证用户名是否存在
    let getNickNameRes = await getNickNameService(username);
    if (getNickNameRes.length !== 0) {
      ctx.body = new Error({
        status: 401,
        message: "用户名已经存在~~~~~~请换个帅气（美丽）的名字"
      });
      return;
    }

    // 验证用户
    if (username) {
      let photo = `${APP_HOST}/uploads/default_photo.png` 
      let { name } = await setNickNameService(username, photo);
      let res = {
        username: name
      }
      // 验证成功 颁发token
      let token = jwt.sign(res, privateKeys.toString(), { algorithm: 'RS256'});
      await updateisGiveLikeService(username);
      ctx.body = new Success({
        status: 200,
        message: "注册成功",
        token
      });
    } else {
      ctx.body = new Error({
        status: 401,
        message: "昵称不能为空！！！！！cao！!"
      });
    }
  }
  async getNickName(ctx, next) {
    let user = jwt.verify(ctx.headers['x-jsonwebtoken-data'], publicKeys);
    ctx.body = user
  }
}

module.exports = new NickNameController();