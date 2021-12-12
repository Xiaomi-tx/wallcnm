const Router = require("koa-router")
const FeLetterRouter = new Router({prefix: "/api/frontendlovewall"});
const {
  setFeLetter,
  getFeLetter,
  removeFeLetter
} = require("../controller/frontendLetter.controller")
const isAuth = require("../middleware/isAuth.middleware")
const setHead = require("../middleware/setHead.middleware")

FeLetterRouter.post("/", setHead, setFeLetter)
FeLetterRouter.delete("/", setHead, removeFeLetter)
FeLetterRouter.get("/", setHead, getFeLetter)


module.exports = FeLetterRouter;