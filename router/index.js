const fs = require('fs');
const path = require("path");

const useRouter = function () {
 fs.readdirSync(path.resolve(__dirname)).forEach(file => {
    if (file === 'index.js') return;
    let route = require(`./${file}`);
    this.use(route.routes())
    this.use(route.allowedMethods())
 })
}


module.exports = useRouter;