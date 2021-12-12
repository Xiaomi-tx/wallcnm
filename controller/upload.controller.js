const { Success, Error } = require("../model/response.model");
const {
  uploadService,
  getNameService,
  updatePhotoService
} = require("../service/upload.service");
const {
  APP_HOST
} = require("../config/app.config")
const path = require("path");
const delFile = require('../utils/delDir')
let oldPhoto = '';
class UploadContoller {
  async upload(ctx, next) {
    let name = ctx.req.username;
    if (!name) {
      ctx.body = new Error({
        status: 401,
        message: "兄弟来个！！名字！！！！懂不懂！！！草！"
      });
      return;
    }

    let filename = "";
    ctx.req.filename && (filename = `${APP_HOST}/uploads/${ctx.req.filename}`);
    if (name) {
      let res = await getNameService(name);
      if(res.length !== 0) {
        oldPhoto = res[0].photo.slice(35);
        delFile(path.join(__dirname, "../public/uploads", oldPhoto))
        try {
          let res = await updatePhotoService(name, filename);
        } catch (error) {
          console.log(error);
        }
        ctx.body = new Success({
          status: 200,
          message: "修改图片成功！~"
        })
        return;
      } 
    }

    if (!filename) {
      ctx.body = new Error({
        status: 401,
        message: "请选择图片呀！！哥哥！~"
      })
      return;
    }
    // 往数据库存储图片
    let result = await uploadService(filename, name);
    ctx.body = new Success({
      status: 200,
      message: "上传成功~~~~~快去看看~~~geigei~~~~"
    })
  }
}

module.exports = new UploadContoller();