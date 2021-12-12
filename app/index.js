const path = require("path");

const Koa = require("koa");
const serve = require('koa-static');
const bodyParser = require("koa-bodyparser");

const fs = require("fs");

// 引入创建文件包
let { createFile } = require("./utils");

// 创建文件
(async() => {
  // await createFile('frontendLetter', '../**service', '../**controller', '../**model', "../**router");
})()

const app = new Koa();
app.use(bodyParser());

app.use(serve(path.resolve(__dirname, "../public")))

app.use(async (ctx, next) => {
  if (ctx.method.toLowerCase() === 'options') {
    ctx.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*'
    });
    ctx.body = '';
    return;
  }
  await next();
})

const useRouter = require('../router/index');

// 获取post传来参数

// 连接数据库服务器
require("./db")

app.useRouter = useRouter;

app.useRouter();

module.exports = app;