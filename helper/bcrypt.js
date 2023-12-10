const bcrypt = require("bcrypt");

class Crypt {
  static encrypt(password, saltRound = 10) {
    return bcrypt.hashSync(password, saltRound);
  }
  static checkEncrypt(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

module.exports = Crypt;
