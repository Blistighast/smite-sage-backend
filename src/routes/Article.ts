import express from "express";

import ArticleModel from "../schema/articleSchema";

import articleUpdater from "../db/articleUpdater";

const router = express.Router();

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

//dev check , scrapes and returns articles from db
router.get("/checkscraper", async (_req, res) => {
  try {
    res.json(await articleUpdater());
  } catch (err) {
    console.error(err);
  }
});

export default router;
