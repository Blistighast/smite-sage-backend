import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

//custom functions
import createSession from "./utils/createSession";
import GodModel from "./schema/godSchema";
import ItemModel from "./schema/itemSchema";
import smiteApiPing from "./api/apiPing";
import serverPing from "./api/serverPing";
import sessionTest from "./api/sessionTest";
import patchnoteFetch from "./api/patchnotesFetch";
import apiUsed from "./api/apiUsed";
import godFetch from "./api/godFetch";
import itemFetch from "./api/itemFetch";
import playerFetch from "./api/playerFetch";

import { session } from "./api/session";

const app = express();
const port = process.env.PORT || 4000;

const databaseUrl = process.env.dataBaseUrl;
let currentPatch = null;

app.listen(port, () => console.log(`listening on port ${port}`));
app.use(
  cors({
    origin: [process.env.frontendUrl],
  })
);

// to stop mongoose warning of future mongoose update
mongoose.set("strictQuery", true);
mongoose.connect(databaseUrl);

//check if version has changed once every 24 hours, if yes update gods & items
setInterval(async () => {
  console.log("checking for version number change");
  await createSession();
  const newPatch = await patchnoteFetch();

  console.log("current patch-", currentPatch, "updated patch-", newPatch);
  if (newPatch !== currentPatch) {
    await godFetch();
    await itemFetch();
  }
  currentPatch = newPatch;
}, 1000 * 60 * 60 * 24);

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
    console.log("grabbing god from db");
    const god = await GodModel.find({ Name: godName });
    resp.json(god);
  } catch (error) {
    console.error(error);
  }
});

app.get("/getitems", async (req, resp) => {
  try {
    console.log(" grabbing items from db");
    const items = await ItemModel.find();
    resp.json(items);
  } catch (error) {
    console.error(error);
  }
});

app.get("/items/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    console.log("grabbing item");
    const item = await ItemModel.find({ ItemId: id });
    resp.json(item);
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
    console.log(err);
  }
});
