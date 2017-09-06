import Poll from "../models/poll";
import AuthenticatedRoute from "../http/authenticated_route";

export default (server) => {
  server.get("/polls", AuthenticatedRoute, (req, res) => {
    Poll.findAll().then((polls) => {
      res.json({
        polls,
      });
    });
  });
};
