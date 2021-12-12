class Common {
  constructor(opt) {
    this.status = opt.status;
    this.message = opt.message;
    opt.token && (this.token = opt.token);
  }
}


class Success extends Common {
  
}

class Error extends Common {
  
}

module.exports = {
  Success,
  Error
}
