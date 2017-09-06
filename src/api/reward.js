import Reward from "../models/reward";
import AuthenticatedRoute from "../http/authenticated_route";

module.exports = (server) => {
  server.get("/rewards", AuthenticatedRoute, (req, res) => {
    Reward.findAll().then((rewards) => {
      res.json({
        rewards,
      });
    });
  });
};
