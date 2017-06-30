const crypto = require("crypto");

const Len = 255;
const SaltLen = 64;
const Iterations = 10000;

module.exports = (password, salt, cb_) => {
  if (typeof cb_ !== "undefined") {
    const cb = cb_;

    crypto.pbkdf2(password, salt, Iterations, Len / 2, "sha256", (err, derivedKey) => {
      if (err) {
        return cb(err);
      }

      return cb(null, derivedKey.toString("hex"));
    });
  } else {
    const cb = salt;

    crypto.randomBytes(SaltLen / 2, (err, saltBytes) => {
      if (err) {
        return cb(err);
      }

      const saltString = saltBytes.toString("hex");

      return crypto.pbkdf2(
        password,
        saltString,
        Iterations,
        Len / 2,
        "sha256",
        (derivErr, derivedKey) => {
          if (derivErr) {
            return cb(derivErr);
          }

          return cb(null, derivedKey.toString("hex"), saltString);
        }
       );
    });
  }
};
