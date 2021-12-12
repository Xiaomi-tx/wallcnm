const multer = require("@koa/multer")
const path = require("path")
const mime = require("mime");
const {
  Error
} = require("../model/response.model")

const limits = {
  fileSize: 600 * 1024,//文件大小 单位 b
  files: 1//文件数量
}

function fileFilter (req, file, cb) {
  let useFile = [
    'image/jpg',
    "image/gif",
    "image/jpeg",
    "image/png"
  ]

  if (!useFile.includes(file.mimetype)){
    cb(new Error('文件必须是 jpg gif jpeg png 格式!!!'))
  } else {
    cb(null, true);
  }
  
}

const storage = multer.diskStorage({
  destination(rqe, file, cb) {
    cb(null, path.resolve(__dirname, "../public/uploads"))
  },
  filename(req,file,cb) {
    let ext = mime.getExtension(file.mimetype);
    let filename = `${Date.now()}_${file.fieldname}.${ext}`;
    req.filename = filename;
    cb(null, filename)
  }
})

const upload = multer({
  storage,
  limits,
  fileFilter
})

const uploadMiddle = async (ctx, next) => {
  let err = await upload.single('photo')(ctx, next)
        .then(res => {
        })
        .catch(err => {
          // console.log(err);
          ctx.body = new Error({
            status: 406,
            message: "文件过大！！！而且文件必须是 jpg gif jpeg png 格式！"
          })
          return;
        })
}





module.exports = uploadMiddle