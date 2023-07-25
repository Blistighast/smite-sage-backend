import express from "express";

import playerFetch from "../api/playerFetch";

const router = express.Router();

//returns specific player
router.get("/:playername", async (req, resp) => {
  try {
    const player = await playerFetch(req.params.playername.replace(":", ""));
    resp.json(player);
  } catch (err) {
    console.error(err);
  }
});

export default router;
