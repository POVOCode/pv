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

  server.post("/polls", AuthenticatedRoute, (req, res) => {
    if (!req.body.poll) {
      return res.status(400).json({ detail: "No poll data on request" });
    }

    const pollData = {};
    const requiredParams = [
      "title", "description", "n_products", "products", "n_votes", "votes",
    ];

    for (let i = 0; i < requiredParams.length; i += 1) {
      const p = requiredParams[i];

      if (typeof req.body.poll[p] === "undefined") {
        return res.status(400).json({ detail: `Poll data missing: ${p}` });
      }

      pollData[p] = req.body.poll[p];
    }

    return Poll.create(pollData).then((poll) => {
      res.json({ poll });
    }).catch((e) => {
      console.error(e.stack);

      res.status(500).json({
        error: "Failed to create poll",
      });
    });
  });

  server.put("/polls/:id", AuthenticatedRoute, (req, res) => {
    const pollData = {};
    const allowedParams = [
      "title", "description", "n_products", "products", "n_votes", "votes",
    ];

    for (let i = 0; i < allowedParams.length; i += 1) {
      const p = allowedParams[i];

      if (typeof req.body.poll[p] !== "undefined") {
        pollData[p] = req.body.poll[p];
      }
    }

    Poll.update(pollData, {
      returning: true,
      plain: true,

      where: {
        id: req.params.id,
      },
    }).then(([, savedPoll]) => {
      res.status(200).json({ poll: savedPoll });
    }).catch(() => {
      res.status(500).json({
        detail: "Failed to save poll",
      });
    });
  });

  /**
   * Deletes a poll by ID, and returns its ID.
   */
  server.delete("/polls/:id", AuthenticatedRoute, (req, res) => {
    Poll.find({
      where: {
        id: req.params.id,
      },
    }).then((poll) => {
      return Poll.destroy({
        where: {
          id: req.params.id,
        },
      }).then(() => {
        res.status(200).json({
          poll: {
            id: Number(req.params.id),
          },
        });

        return poll;
      });
    }).catch(() => {
      res.status(500).json({
        error: "Failed to delete poll",
      });
    });
  });
};
