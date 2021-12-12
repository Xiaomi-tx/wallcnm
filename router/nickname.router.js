const Router = require("koa-router");

const nickNameRouter = new Router({prefix: "/api/nickname"});

const {
  setNickName,
  getNickName
} = require("../controller/nickName.controller");
const isAuth = require("../middleware/isAuth.middleware")

// 设置响应头 CORS跨域
const setHead = require("../middleware/setHead.middleware")

// 设置昵称路由
nickNameRouter.post("/", setHead, setNickName);
nickNameRouter.get("/", setHead, isAuth, getNickName);


module.exports = nickNameRouter;