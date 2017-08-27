const Passport = require("passport");
const MailchimpAPILib = require("mailchimp-v3-api");
const Sequelize = require("sequelize");

const UserModel = require("../../models/user");
const AuthenticatedRoute = require("../http/authenticated_route");
const hashPassword = require("../util/hash_password");
const Logger = require("../logger");

const MailchimpAPI = new MailchimpAPILib({
  key: "",
  debug: false,
});

module.exports = (server) => {
  server.post("/login", Passport.authenticate("local"), (req, res) => {
    res.json({
      user: req.user,
    });

    Logger.info(`Logged user in: ${req.user.username}`);
  });

  server.get("/logout", (req, res) => {
    if (!req.user) return res.sendStatus(400);

    const { username } = req.user;

    req.logout();
    res.sendStatus(200);

    Logger.info(`Logged user out: ${username}`);
  });

  server.get("/user", AuthenticatedRoute, (req, res) => {
    res.json({
      user: req.user,
    });
  });

  server.post("/preregister", (req, res) => {
    const { username, email, password, } = req.body;

    if (
      (!username || username.length < 3) ||
      (!email || email.length < 3) ||
      (!password || password.length < 5)
    ) {
      return res.sendStatus(400);
    }

    return UserModel
      .hashPassword(password)
      .then((data) => {
        return UserModel.create({
          username,
          email,
          password: data.password,
          passwordSalt: data.salt,

          postcode: req.body.postcode || "",
          interests: req.body.interests || "",
          enableEmailUpdates: !!req.body.enableEmailUpdates,
        });
      }).then((user) => {
        if (!user.enableEmailUpdates) return null;

        // Do Mailchimp signup.
        return MailchimpAPI.post("/lists/:id/members", {
          email_address: email,
          email_type: "html",
          status: "pending",
          ip_signup: req.ip,
          timestamp_signup: new Date().toISOString(),
        });
      }).then(() => {
        res.sendStatus(200);
      }).catch((err) => {

        // Just report the first one
        if (err.errors) {
          const e = err.errors[0];

          if (e.type === "unique violation" && e.path === "username") {
            return res.sendStatus(401);
          }

          return res.sendStatus(400);
        }

        Logger.error(err.message);
        Logger.error(err.stack);

        return res.sendStatus(500);
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
