import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cron from "node-cron";
import "dotenv/config";

//custom functions
import createSession from "./utils/createSession";
import GodModel from "./schema/godSchema";
import ItemModel from "./schema/itemSchema";
import ArticleModel from "./schema/articleSchema";
import smiteApiPing from "./api/apiPing";
import sessionTest from "./api/sessionTest";
import patchnoteFetch from "./api/patchnotesFetch";
import apiUsed from "./api/apiUsed";
import godFetch from "./api/godFetch";
import itemFetch from "./api/itemFetch";
import playerFetch from "./api/playerFetch";

import { session } from "./api/session";
import patchUpdater from "./db/patchUpdater";
import articleUpdater from "./db/articleUpdater";

// Routes
import apiRouter from "./routes/Api";
import smiteApiRouter from "./routes/SmiteApi";
import godsRouter from "./routes/Gods";

const app = express();
const port = process.env.PORT || 4000;

const databaseUrl = process.env.dataBaseUrl;
let currentPatch = null;

app.listen(port, () => console.log(`listening on port ${port}`));
app.use(
  cors({
    origin: [process.env.frontendUrl || "http://localhost:3000"],
  })
);

// to stop mongoose warning of future mongoose update
mongoose.set("strictQuery", true);
mongoose.connect(databaseUrl);

//check if version has changed once every 24 hours, if yes update gods & items, check if any new article released
cron.schedule("0 0 * * *", async () => {
  const newPatch = await patchUpdater(currentPatch);
  currentPatch = newPatch;

  await articleUpdater();
});

// setInterval(async () => {
//   const newPatch = await patchUpdater(currentPatch);
//   currentPatch = newPatch;

//   await articleUpdater();
// }, 1000 * 60 * 60 * 24);

app.get("/", (_req, res) => {
  try {
    res.send("Smite Sage API");
  } catch (err) {
    console.error(err);
  }
});

app.use("/api", apiRouter);

app.use("/smiteapi", smiteApiRouter);

app.use("/gods", godsRouter);

app.get("/getitems", async (_req, resp) => {
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

app.get("/items/:name", async (req, resp) => {
  try {
    const itemName = req.params.name;
    const item = await ItemModel.find({ DeviceName: itemName });
    resp.json(item);
  } catch (err) {
    console.error(err);
  }
});

app.get("/article/:type", async (req, resp) => {
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

app.get("/getplayer/:playername", async (req, resp) => {
  try {
    const player = await playerFetch(req.params.playername);
    resp.json(player);
  } catch (err) {
    console.error(err);
  }
});

app.get("/devmanualupdate", async (_req, resp) => {
  try {
    await createSession();
    const newPatch = await patchnoteFetch();
    await godFetch();
    await itemFetch();

    currentPatch = newPatch;
    console.log("updated patch-", newPatch);
    resp.json("updated database");
  } catch (err) {
    console.error(err);
  }
});

app.get("/checkscraper", async (_req, res) => {
  try {
    res.json(await articleUpdater());
  } catch (err) {
    console.error(err);
  }
});
