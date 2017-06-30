const RewardModel = require("../../models/reward");
const AuthenticatedRoute = require("../http/authenticated_route");
const Crypto = require("crypto");

module.exports = (server) => {
  server.get("/rewards", AuthenticatedRoute, (req, res) => {
    RewardModel.findAll().then((rewards) => {
      res.json({
        rewards,
      });
    });
  });
};
