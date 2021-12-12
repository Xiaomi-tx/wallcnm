const { Success, Error } = require("../model/response.model");
const {
  givelikeService,
  getGiveLikeService
} = require("../service/givelike.service")

class GiveLikeController {
  async givelike(ctx, next) {
    let { id } = ctx.request.body;
    // 莫有傳入 ID
    if (!id) {
      ctx.body(new Error({
        status: 401,
        message: "请传入表白文章ID"
      }));
      return 
    }

    let res = await givelikeService(id, ctx.req.username);

    ctx.body = new Success({
      status: 200,
      message: {
        bol: res.bol,
        dot: res.count,
        id: res.id
      }
    })
  }
  async getGiveLike(ctx, next) {
    let res = await getGiveLikeService();
    ctx.body = res;
  }
}

module.exports = new GiveLikeController();