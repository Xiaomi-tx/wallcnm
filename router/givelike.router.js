const Router = require("koa-router");

const GiveLikeRouter = new Router({prefix: "/api/givelike"})

const isAuth = require("../middleware/isAuth.middleware");
const setHead = require("../middleware/setHead.middleware");

const {
  givelike,
  getGiveLike
} = require("../controller/givelike.controller")

GiveLikeRouter.post("/", setHead, isAuth, givelike)
GiveLikeRouter.get("/", setHead, isAuth, getGiveLike)

module.exports = GiveLikeRouter;