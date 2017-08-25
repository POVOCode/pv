const PassportLocalStrategy = require("passport-local").Strategy;
const UserModel = require("../../models/user");
const hashPassword = require("../util/hash_password");

// We actually query by email now
module.exports = new PassportLocalStrategy((username, pw, done) => {
  UserModel.findOne({ where: { email: username } }).then((user) => {
    if (!user) {
      return done(null, false, {
        message: "Invalid username or password",
      });
    }

    return hashPassword(pw, user.passwordSalt, (err, hash) => {
      if (err) {
        return done(err);
      }

      if (hash !== user.password) {
        return done(null, false, {
          message: "Invalid username or password",
        });
      }

      // TODO: Break this out, it is repeated here twice
      Object.assign(user, {
        password: undefined,
        passwordSalt: undefined,
      });

      return done(null, user);
    });
  }).catch(done);
});
