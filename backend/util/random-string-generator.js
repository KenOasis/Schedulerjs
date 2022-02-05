const crypto = require("crypto");

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const numset = "0123456789";

const specialset = "@$!%*#?&";
const allset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*#?&";

const generator = (size) => {
  if (size <= 1) {
    return "";
  }
  let str = "";
  for (let i = 0; i < size; ++i) {
    if (i === 0) {
      str += charset.charAt(crypto.randomInt(charset.length));
    } else if (i === 1) {
      str += numset.charAt(crypto.randomInt(numset.length));
    } else if (i == 3) {
      str += specialset.charAt(crypto.randomInt(specialset.length));
    } else {
      str += allset.charAt(crypto.randomInt(allset.length));
    }
  }
  return str;
};

module.exports = generator;
