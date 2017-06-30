const Passport = require("passport");
const UserModel = require("../../models/user");
const AuthenticatedRoute = require("../http/authenticated_route");
const hashPassword = require("../util/hash_password");

module.exports = (server) => {
  server.post("/login", Passport.authenticate("local"), (req, res) => {
    res.json({
      user: req.user,
    });
  });

  server.get("/logout", (req, res) => {
    req.logout();
    res.sendStatus(200);
  });

  server.get("/user", AuthenticatedRoute, (req, res) => {
    res.json({
      user: req.user,
    });
  });

  // TODO: Refactor this monster w/ promises!
  server.post("/user", AuthenticatedRoute, (req, res) => {
    const { username, email, password, verifyPassword, currentPassword } = req.body.user;

    UserModel.findOne({ id: req.user.id }).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User does not exist",
        });
      }

      if (!currentPassword) {
        return res.status(400).json({
          detail: "Password required for changes",
        });
      }

      if (!username || username.length === 0) {
        return res.status(400).json({
          detail: "Username empty",
        });
      }

      if ((password || verifyPassword) && (password !== verifyPassword)) {
        return res.status(400).json({
          detail: "Passwords do not match",
        });
      }

      // TODO: Implement proper hidden response errors in production
      try {
        return hashPassword(currentPassword, user.passwordSalt, (err, hash) => {
          if (err) {
            return res.status(500).json({ detail: "Critical internal error: 1" });
          }

          if (hash !== user.password) {
            return res.status(401).json({
              detail: "Current password does not match",
            });
          }

          const updateUser = (h) => {
            const packet = { username, email };
            if (h) packet.password = h;

            return UserModel.update(packet, {
              returning: true,
              plain: true,

              where: {
                id: user.id,
              },
            }).then(([, savedUser]) => {
              Object.assign(savedUser, {
                password: undefined,
                passwordSalt: undefined,
              });

              res.status(200).json({
                user: savedUser,
              });
            }).catch(() => {
              res.status(500).json({
                detail: "Failed to save user",
              });
            });
          };

          if (password) {
            return hashPassword(password, user.passwordSalt, (newErr, newHash) => {
              if (newErr) {
                return res.status(500).json({ detail: "Critical internal error: 2" });
              }

              return updateUser(newHash);
            });
          }

          updateUser();
        });
      } catch (e) {
        console.error(e.stack);

        return res.status(400).json({
          detail: "Malformed password",
        });
      }
    }).catch(() => {
      res.status(500).json({
        detail: "Failed to load user",
      });
    });
  });
};
