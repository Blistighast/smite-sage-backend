import express from "express";

import ArticleModel from "../schema/articleSchema";

import articleUpdater from "../db/articleUpdater";
import webScraper from "../utils/webScraper";

const router = express.Router();

//dev check , scrapes and returns articles from db
router.get("/checkscraper", async (_req, res) => {
  try {
    res.json(await webScraper());
  } catch (err) {
    console.error(err);
  }
});

router.get("/articleupdate", async (_req, res) => {
  try {
    res.json(await articleUpdater());
  } catch (err) {
    console.error(err);
  }
});

//returns latest article type from db
router.get("/:type", async (req, resp) => {
  try {
    const articleType = req.params.type;
    const article = await ArticleModel.find({ type: articleType })
      .sort({ datePosted: -1 })
      .limit(1);
    resp.json(article);
  } catch (err) {
    console.error(err);
  }
});

export default router;
