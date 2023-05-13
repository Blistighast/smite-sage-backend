import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import nodeCron from "node-cron";
import "dotenv/config";

//custom functions
import createSession from "./utils/createSession";
import GodModel from "./schema/godSchema";
import ItemModel from "./schema/itemSchema";
import ArticleModel from "./schema/articleSchema";
import smiteApiPing from "./api/apiPing";
import serverPing from "./api/serverPing";
import sessionTest from "./api/sessionTest";
import patchnoteFetch from "./api/patchnotesFetch";
import apiUsed from "./api/apiUsed";
import godFetch from "./api/godFetch";
import itemFetch from "./api/itemFetch";
import playerFetch from "./api/playerFetch";

import { session } from "./api/session";
import patchUpdater from "./db/patchUpdater";
import articleUpdater from "./db/articleUpdater";

const app = express();
const router = express.Router();
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

//check server health
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

router.get("/health", (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
});

app.use("/api", router);

//check if version has changed once every 24 hours, if yes update gods & items, check if any new article released
setInterval(async () => {
  const newPatch = await patchUpdater(currentPatch);
  currentPatch = newPatch;

  await articleUpdater();
}, 1000 * 60 * 60 * 24);

app.get("/", (req, res) => {
  try {
    res.send("Smite Sage API");
  } catch (err) {
    console.error(err);
  }
});

app.get("/ping", (_req, res) => {
  return res.send("pong 🏓");
});

//server ping, returns timestamp
app.get("/api", (req, resp) => {
  try {
    resp.json(serverPing());
  } catch (error) {
    console.log(error);
  }
});

//ping the smite api
app.get("/smiteapi", async (req, resp) => {
  try {
    resp.json(await smiteApiPing());
  } catch (error) {
    console.log(error);
  }
});

//create a session to be able to get more info from smite api
app.get("/createsession", async (req, resp) => {
  try {
    await createSession();

    resp.json(session);
  } catch (error) {
    console.log(error);
  }
});

app.get("/testsession", async (req, resp) => {
  try {
    resp.json(await sessionTest());
  } catch (error) {
    console.log(error);
  }
});

app.get("/patchnotes", async (req, resp) => {
  try {
    resp.json(await patchnoteFetch());
  } catch (err) {
    console.log(err);
  }
});

app.get("/getuseddata", async (req, resp) => {
  try {
    resp.json(await apiUsed());
  } catch (err) {
    console.error(err);
  }
});

app.get("/getgods", async (req, resp) => {
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

app.get("/gods/:name", async (req, resp) => {
  try {
    const godName = req.params.name;
    const god = await GodModel.find({ Name: godName });
    resp.json(god);
  } catch (error) {
    console.error(error);
  }
});

app.get("/latestgod", async (req, resp) => {
  try {
    //swap to this when new god comes in
    // const god = await GodModel.find().sort({ createdAt: -1 }).limit(1);
    const god = await GodModel.find({ Name: "Ix Chel" }); //temp until new god with createdAt is added
    resp.json(god);
  } catch (error) {
    console.error(error);
  }
});

app.get("/getitems", async (req, resp) => {
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

app.get("/devmanualupdate", async (req, resp) => {
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

app.get("/devcountgods", async (req, resp) => {
  try {
    const godCount = await GodModel.where().countDocuments();
    console.log(godCount);
    resp.json(godCount);
  } catch (err) {
    console.error(err);
  }
});

app.get("/checkscraper", async (req, res) => {
  try {
    // res.json(await webScraper());
    res.json(await articleUpdater());
  } catch (err) {
    console.error(err);
  }
});

// module.exports = app;
