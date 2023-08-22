import express from "express";

import GodModel from "../schema/godSchema";
import recommendedItemFetch from "../api/recommendedItemsFetch";

const router = express.Router();

//returns all gods
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

//returns latest god
router.get("/latestgod", async (_req, resp) => {
  try {
    //swap to this when new god comes in
    // const gods = await GodModel.find().sort({ createdAt: -1 }).limit(2); // latest 2 gods
    const god = await GodModel.find().sort({ createdAt: -1 }).limit(1);
    resp.json(god);
  } catch (error) {
    console.error(error);
  }
});

//returns amount of gods
router.get("/godscount", async (_req, resp) => {
  try {
    const godCount = await GodModel.where().countDocuments();
    resp.json(godCount);
  } catch (err) {
    console.error(err);
  }
});

router.get("/recommendeditems/:godid", async (req, resp) => {
  try {
    const recommendedItems = await recommendedItemFetch(req.params.godid);
    console.log(recommendedItems);
    resp.json(recommendedItems);
  } catch (err) {
    console.error(err);
  }
});

//returns specific god
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
