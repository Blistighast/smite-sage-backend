import express from "express";

import GodModel from "../schema/godSchema";

const router = express.Router();

router.get("/", async (_req, resp) => {
  try {
    console.log("grabbing gods list from db");
    const gods = await GodModel.find().select(
      "Name Pantheon Roles godCard_URL godIcon_URL id"
    );
    resp.json(gods);
  } catch (error) {
    console.log(error);
  }
});

router.get("/latestgod", async (_req, resp) => {
  try {
    //swap to this when new god comes in
    // const gods = await GodModel.find().sort({ createdAt: -1 }).limit(2);
    const god = await GodModel.find({ Name: "Ix Chel" }); //temp until new god with createdAt is added
    resp.json(god);
  } catch (error) {
    console.error(error);
  }
});

router.get("/godscount", async (_req, resp) => {
  try {
    const godCount = await GodModel.where().countDocuments();
    resp.json(godCount);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:name", async (req, resp) => {
  try {
    const godName = req.params.name;
    const god = await GodModel.find({ Name: godName });
    resp.json(god);
  } catch (error) {
    console.error(error);
  }
});

export default router;
