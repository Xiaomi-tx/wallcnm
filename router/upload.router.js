const Router = require("koa-router");

const uploadRouter = new Router({prefix: "/api/upload"});

const isAuth = require("../middleware/isAuth.middleware")

const uploadMiddle = require("../middleware/upload.middleware");
const {
  upload
} = require("../controller/upload.controller")
// 设置响应头 CORS跨域
const setHead = require("../middleware/setHead.middleware")

// 设置图片路由
uploadRouter.post("/", setHead, isAuth, uploadMiddle, upload);

module.exports = uploadRouter;