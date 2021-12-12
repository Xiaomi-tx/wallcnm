const fs = require("fs");
const path = require("path");

const pathJoin = (filepath) => {
  return path.resolve(__dirname, filepath);
}

const createFile = (name, path, ...args) => {
  return new Promise((resolve, reject) => {
    let reg = /.\/(\*\*.+)$/
    fs.readdir(pathJoin(path), (err, files) => {
      let filename = path.match(reg);
      filename = filename[1].replace("**", "")
      path = path.replace("**", "");
      let mainFilePath = `${path}/${name}.${filename}.js`;
      // 0. 判断path中是否有 name.path 文件
      mainFilePath = pathJoin(mainFilePath);
      let resMainFile = fs.existsSync(mainFilePath)
      if (!resMainFile) {
        // 0.1 如果没有则生成
        fs.writeFileSync(mainFilePath, 'a+');
      }

      // 2. 判断 args 中是否有 name.path 文件，如果没有则生成，如果有则不生成
      args.forEach((file, index) => {
        let filename = file.match(reg);
        filename = filename[1].replace("**", "");
        file = file.replace("**", "");
        
        const findFilePath = `${file}/${name}.${filename}.js`;
        let res = fs.existsSync(pathJoin(findFilePath));
        if (!res) {
          // 如果没有则创建
          fs.writeFileSync(pathJoin(findFilePath), 'a+');
          if (index >= args.length - 1) {
            resolve();
          }
        } else {
          if (index >= args.length - 1) {
            resolve();
          }
        }
      })
    })
  })
}

module.exports = {
  createFile
}