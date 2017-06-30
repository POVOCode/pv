const PollModel = require("../../models/poll");
const AuthenticatedRoute = require("../http/authenticated_route");
const Crypto = require("crypto");

module.exports = (server) => {
  server.get("/polls", AuthenticatedRoute, (req, res) => {
    PollModel.findAll().then((polls) => {
      res.json({
        polls,
      });
    });
  });
};
