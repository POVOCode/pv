const Passport = require("passport");
const UserModel = require("../../models/user");

// TODO: Move passport logic out of this file
Passport.serializeUser((user, done) => {
  done(null, user.id);
});

Passport.deserializeUser((id, done) => {
  UserModel.findOne({ where: { id } }).then((user) => {
    Object.assign(user, {
      password: undefined,
      passwordSalt: undefined,
    });

    done(null, user);
    return null;
  }).catch(done);
});

Passport.use(require("./passport_local_strategy"));

module.exports = Passport;
