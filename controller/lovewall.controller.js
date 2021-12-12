const { Success, Error } = require("../model/response.model");
const path = require("path");
const {
  APP_HOST
} = require("../config/app.config")
const {
  setLetterService,
  getLetterService,
  updateLetterService,
  assignLetterService,
  getIdLetterService,
  updateLetterCountService,
} = require("../service/lovewall.server")

const {
  setGiveLikeService
} = require("../service/givelike.service")

let delFile = require("../utils/delDir")

class LoveWallController {
  async setLetter(ctx, body) {
    if (!ctx.req.username || !ctx.request.body.message) {
      ctx.body = new Error({
        status: 401,
        messsage: "曹尼玛的，能不能判断一下，不能传入空的字符串还有，名字你几把都不传一个草无语了！。"
      })
      return;
    }
    
    ctx.request.body.photos = ctx.req.photos.map((item) => {
      return `${APP_HOST}/uploads/${item}`;
    })
    try {
      
      let {_id, name} = await setLetterService(ctx.request.body, ctx.req.username);
      await setGiveLikeService(_id, name);
      ctx.body = new Success({
        status: 200,
        message: "发表成功"
      })
      return
    } catch (error) {
      ctx.body = new Error({
        status: 401,
        message: "发表失败"
      })
      return;
    }
  }
  async getLetter(ctx, body) {
    let query = ctx.request.query;
    if (!query.offset) {
      query.offset = 0;
    } else if (!query.size) {
      query.size = 50;
    }
    let res = await getLetterService(query);
    ctx.body = res;
  }
  async updateLetter(ctx, body) {
    let { id } = ctx.request.body;
    // 判断传入图片才 去删除旧图片
    let res = await getIdLetterService(id);
    if (ctx.req.photos.length !== 0) {
      if (res.length !== 0) {
        // 1. 获取到旧图片
        let oldPhotos = res[0].photos;
        let disponePhoto = [];
        oldPhotos.forEach(file => {
          file = file.slice(35);
          disponePhoto.push(path.join(__dirname, "../public/uploads", file));
        })
        delFile(disponePhoto, () => {
          console.log('删除成功');
        });
      }
    }


    ctx.request.body.photos = ctx.req.photos.map((item) => {
      return `${APP_HOST}/uploads/${item}`;
    })
    let ai = await updateLetterService(ctx.request.body, ctx.req.username);
    ctx.body = ai;
  }
  async assignLetter(ctx, body) {

  }
}

module.exports = new LoveWallController()