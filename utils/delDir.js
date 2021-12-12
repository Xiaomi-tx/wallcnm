const fs = require("fs");

function delFile(targetFilePath, callback) {
  if (typeof targetFilePath == 'object') {
    let i = targetFilePath.length;
    targetFilePath.forEach(function(filepath){ 
      fs.unlink(filepath, function(err) { 
        i--; 
        if (err) { 
          callback(err); 
          return; 
        } else if (i <= 0) { 
          callback(null); 
        } 
      }); 
    }); 
      // fs.unlinkSync(file);
    return;
  }
  return fs.unlinkSync(targetFilePath);
}

module.exports = delFile;