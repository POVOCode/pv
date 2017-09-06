import Passport from "passport";
import User from "../models/user";
import LocalStrategy from "./passport_local_strategy";

// TODO: Move passport logic out of this file
Passport.serializeUser((user, done) => {
  done(null, user.id);
});

Passport.deserializeUser((id, done) => {
  User.findOne({ where: { id } }).then((user) => {
    Object.assign(user, {
      password: undefined,
      passwordSalt: undefined,
    });

    done(null, user);
    return null;
  }).catch(done);
});

Passport.use(LocalStrategy);

export default Passport;
