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

  server.post("/rewards", AuthenticatedRoute, (req, res) => {
    if (!req.body.reward) {
      return res.status(400).json({ detail: "No reward data on request" });
    }

    const rewardData = {};
    const requiredParams = [
      "label", "brand", "point_cost", "description", "image_urls",
    ];

    for (let i = 0; i < requiredParams.length; i += 1) {
      const p = requiredParams[i];

      if (typeof req.body.reward[p] === "undefined") {
        return res.status(400).json({ detail: `Reward data missing: ${p}` });
      }

      rewardData[p] = req.body.reward[p];
    }

    return Reward.create(rewardData).then((reward) => {
      res.json({ reward });
    }).catch((e) => {
      console.error(e.stack);

      res.status(500).json({
        error: "Failed to create reward",
      });
    });
  });

  server.put("/rewards/:id", AuthenticatedRoute, (req, res) => {
    const rewardData = {};
    const allowedParams = [
      "label", "brand", "point_cost", "description", "image_urls",
    ];

    for (let i = 0; i < allowedParams.length; i += 1) {
      const p = allowedParams[i];

      if (typeof req.body.reward[p] !== "undefined") {
        rewardData[p] = req.body.reward[p];
      }
    }

    Reward.update(rewardData, {
      returning: true,
      plain: true,

      where: {
        id: req.params.id,
      },
    }).then(([, savedReward]) => {
      res.status(200).json({ reward: savedReward });
    }).catch(() => {
      res.status(500).json({
        detail: "Failed to save reward",
      });
    });
  });

  /**
   * Deletes a reward by ID, and returns its ID.
   */
  server.delete("/rewards/:id", AuthenticatedRoute, (req, res) => {
    Reward.find({
      where: {
        id: req.params.id,
      },
    }).then((reward) => {
      return Reward.destroy({
        where: {
          id: req.params.id,
        },
      }).then(() => {
        res.status(200).json({
          reward: {
            id: Number(req.params.id),
          },
        });

        return reward;
      });
    }).catch(() => {
      res.status(500).json({
        error: "Failed to delete reward",
      });
    });
  });
};
