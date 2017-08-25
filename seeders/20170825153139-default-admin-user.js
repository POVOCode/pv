const UserModel = require("../models/user");
const hashPassword = require("../lib/util/hash_password");

module.exports = {
  up(queryInterface, DataTypes, done) {
    hashPassword("password", (err, password, salt) => {
      if (err) {
        return done(err);
      }

      return UserModel.create({
        username: "f3rno",
        email: "me@f3rno.com",
        password,
        passwordSalt: salt,
        admin: true,
      }).then(() => done()).catch(done);
    });
  },

  down(queryInterface, DataTypes, done) {
    return UserModel.destroy({
      where: {
        username: "f3rno",
        email: "me@f3rno.com",
      },
    }).then(() => done()).catch(done);
  },
};
