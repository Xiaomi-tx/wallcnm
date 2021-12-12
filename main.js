const {
  APP_PORT,
  APP_HOST,
} = require("./config/app.config")

const app = require('./app/index');

app.listen(APP_PORT, () => {
  console.log(`服务器${APP_PORT}启动成功`);
})