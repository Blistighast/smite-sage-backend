import express from "express";

import ItemModel from "../schema/itemSchema";

const router = express.Router();

//returns all items
router.get("/", async (_req, resp) => {
  try {
    console.log(" grabbing items from db");
    const items = await ItemModel.find().select(
      "ItemId DeviceName ItemTier StartingItem itemIcon_URL Glyph Type Price"
    );
    resp.json(items);
  } catch (error) {
    console.error(error);
  }
});

//returns specific item
router.get("/:name", async (req, resp) => {
  try {
    const itemName = req.params.name;
    const item = await ItemModel.find({ DeviceName: itemName });
    resp.json(item);
  } catch (err) {
    console.error(err);
  }
});

export default router;
