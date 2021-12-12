const fs = require('fs');
const path = require("path");

const privateKeys = fs.readFileSync(path.resolve(__dirname, "../keys/private_key.pem"));

const publicKeys = fs.readFileSync(path.resolve(__dirname, "../keys/public_key.pem"));

module.exports = {
  privateKeys,
  publicKeys
}