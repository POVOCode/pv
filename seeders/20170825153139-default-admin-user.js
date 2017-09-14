const User = require("../dist/models/user").default;

module.exports = {
  up(queryInterface, DataTypes, done) {
    User.hashPassword("password").then(({ password, salt }) => {
      return User.create({
        username: "f3rno",
        email: "me@f3rno.com",
        password,
        passwordSalt: salt,
        admin: true,
      });
    }).then(() => done()).catch(done);
  },

  down(queryInterface, DataTypes, done) {
    return User.destroy({
      where: {
        username: "f3rno",
        email: "me@f3rno.com",
        admin: true,
      },
    }).then(() => done()).catch(done);
  },
};
