const Router = require("koa-router");
const loveWallRouter = new Router({prefix: "/api/lovewall"});

const {
  setLetter,
  getLetter,
  updateLetter,
  assignLetter
} = require("../controller/lovewall.controller");
const isAuth = require("../middleware/isAuth.middleware");
const setHead = require("../middleware/setHead.middleware");
const uploadsMiddle = require("../middleware/uploads.middleware");


loveWallRouter.post("/", setHead, isAuth, uploadsMiddle, setLetter)

loveWallRouter.get("/", setHead, getLetter)
loveWallRouter.get("/:name", setHead, assignLetter)

loveWallRouter.patch("/", setHead, isAuth, uploadsMiddle, updateLetter)

module.exports = loveWallRouter;