var crypto = require("crypto");

const hashPassword = (password, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          reject(err);
        } else {
          resolve(hashedPassword);
        }
      }
    );
  });
};

module.exports = { hashPassword };
