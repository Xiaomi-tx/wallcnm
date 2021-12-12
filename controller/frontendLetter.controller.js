const { Success, Error } = require("../model/response.model");
const {
  setFeLetter,
  getFeLetter,
  getIdLetter,
  removeLetter
} = require("../service/frontendLetter.service")
const {
  removeLetterService
} = require("../service/lovewall.server")
const {
  removeGiveLikeService
} = require("../service/givelike.service")
class FrontEndLetter {
  async setFeLetter(ctx, next) {
    // 0. 获取数据
    let body = ctx.request.body
    // 1. 进入先判断数据中是否有重复数据
    let letterRes = await getIdLetter(body._id);
    // 1.1 防止admin用户乱搞
    if (letterRes) {
      ctx.body = new Error({
        status: 401,
        message: "小老弟你怕是想让服务器挂吧，多次给服务器同样的数据"
      })
      return;
    }
    
    
    // 2. 判断message字段是否为空
    if (body.message === undefined) {
      ctx.body = new Success({
        status: 401,
        message: "传输失败"
      })
      return;
    }

    // 3. 数据库进行传输
    let res = await setFeLetter(body);
    ctx.body = new Success({
      status: 200,
      message: "传输成功"
    })
  }
  async getFeLetter(ctx, next) {
    let query = ctx.request.query
    let offset = query.offset;
    let size = query.size;
    let obj = {}
    size && (obj.size = size);
    offset && (obj.offset = offset);
    let res = await getFeLetter(obj);
    ctx.body = res;
  }
  async removeFeLetter(ctx, next) {
    let {_id} = ctx.request.body;
    // 删除 lovewall 
    let res = await removeLetterService(_id);
    // 删除 givelike
    await removeGiveLikeService(_id);

    // 判断 提供前端信封接口里面是否有该数据
    let frontendLetterRes = await getIdLetter(_id);

    if (frontendLetterRes) {
      await removeLetter(_id);
    }

    if (res.deletedCount > 0) {
      ctx.body = new Success({
        status: 200,
        message: "不通过成功！！！~~"
      })
      return
    } else {
      ctx.body = new Success({
        status: 200,
        message: "不通过失败！！！！！~~草！"
      })
      return
    }
  }
}

module.exports = new FrontEndLetter();