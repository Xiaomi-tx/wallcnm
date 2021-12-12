const setHead = async (ctx, next) => {
  ctx.set({
    'Access-Control-Allow-Origin': '*',
    "Content-Type": "application/json; charset=utf8",
    'Access-Control-Request-Headers': '*',
    'Access-Control-Expose-Headers': 'testHeader'
  });
  ctx.req.photos = [];
  await next();
}

module.exports = setHead;