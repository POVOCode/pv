const UserModel = require("../models/user");

module.exports = {
  up(queryInterface, DataTypes, done) {
    UserModel.hashPassword("password").then(({ password, salt }) => {
      return UserModel.create({
        username: "f3rno",
        email: "me@f3rno.com",
        password,
        passwordSalt: salt,
        admin: true,
      });
    }).then(() => done()).catch(done);
  },

  down(queryInterface, DataTypes, done) {
    return UserModel.destroy({
      where: {
        username: "f3rno",
        email: "me@f3rno.com",
        admin: true,
      },
    }).then(() => done()).catch(done);
  },
};
