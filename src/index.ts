import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { DateTime } from "luxon";
import mongoose from "mongoose";
import "dotenv/config";

//custom functions
import createSignature from "./utils/createSignature";
import createSession from "./utils/createSession";
import GodModel from "./schema/godSchema";
import ItemModel from "./schema/itemSchema";

const app = express();
const port = process.env.PORT || 4000;

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;
const databaseUrl = process.env.dataBaseUrl;
let session = null;
let timeout;

app.listen(port, () => console.log(`listening on port ${port}`));
app.use(
  cors({
    origin: [process.env.frontendUrl],
  })
);

mongoose.set("strictQuery", true);
mongoose.connect(databaseUrl);

//server ping, returns timestamp
app.get("/api", (req, resp) => {
  try {
    console.log("I got a server ping!");
    const timeStamp = DateTime.utc().toFormat("yyyyMMddhhmmss");
    resp.json({ message: "backend up and running", timeStamp });
  } catch (error) {
    console.log(error);
  }
});

//ping the smite api
app.get("/smiteapi", async (req, resp) => {
  try {
    console.log("I got a smite ping!");
    const smitePingUrl = `${apiUrl}/pingjson`;
    const smitePingCall = await fetch(smitePingUrl);
    const data = await smitePingCall.json();
    console.log(data);
    resp.json(data);
  } catch (error) {
    console.log(error);
  }
});

//create a session to be able to get more info from smite api
// creating a session only works after 9pm est for some reason, not sure how to fix yet, says timestamp issue before then even though they match
app.get("/createsession", async (req, resp) => {
  try {
    console.log("creating Session", session);

    session = await createSession(session);
    console.log(session);

    //smite api sessions can only last 15 min, so need to create a new one before then
    //this could make multiple setTimeouts, if called in succession, deleting a session
    // before it needs to be, which would make unnessary calls to the smite api
    // need to fix later
    console.log("setting the timeout");
    if (timeout) {
      //refresh 15 minute timer if another call is made before it is done
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => (session = null), 1000 * 60 * 14); //reset the session after 14 min

    resp.json(session);
  } catch (error) {
    console.log(error);
  }
});

app.get("/testsession", async (req, resp) => {
  try {
    if (!session) {
      console.log("there is no session");
      resp.json({ errorMessage: "There is no session" });
    } else {
      console.log(`testing ${session} session connection`);
      const timeStamp = DateTime.utc().toFormat("yyyyMMddhhmmss");
      const signature = createSignature("testsession", timeStamp);
      const testSessionUrl = `${apiUrl}/testsessionjson/${devId}/${signature}/${session}/${timeStamp}`;
      const smiteResp = await fetch(testSessionUrl);
      const data = await smiteResp.json();
      console.log(data);
      resp.json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/patchnotes", async (req, resp) => {
  try {
    if (!session) {
      console.log("make session");
      resp.json({ errorMessage: "You need to make a session first" });
    } else {
      const timestamp = DateTime.utc().toFormat("yyyyMMddhhmmss");
      const signature = createSignature("getpatchinfo", timestamp);
      const patchNotesUrl = `${apiUrl}/getpatchinfojson/${devId}/${signature}/${session}/${timestamp}`;
      const patchNoteResp = await fetch(patchNotesUrl);
      const data = await patchNoteResp.json();
      resp.json(data);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/getuseddata", async (req, resp) => {
  try {
    const timestamp = DateTime.utc().toFormat("yyyyMMddhhmmss");
    const signature = createSignature("getdataused", timestamp);
    const dataUsedUrl = `${apiUrl}/getdatausedjson/${devId}/${signature}/${session}/${timestamp}`;
    const dataUsedResp = await fetch(dataUsedUrl);
    const data = await dataUsedResp.json();
    resp.json(data);
  } catch (err) {
    console.error(err);
  }
});

app.get("/getgods", async (req, resp) => {
  try {
    if (!session) {
      console.log(
        "no smite api session created, only grabbing gods list from db"
      );
      const gods = await GodModel.find();
      resp.json(gods);
    } else {
      console.log("getting gods");
      const timeStamp = DateTime.utc().toFormat("yyyyMMddhhmmss");
      const signature = createSignature("getgods", timeStamp);
      const getGodsUrl = `${apiUrl}/getgodsjson/${devId}/${signature}/${session}/${timeStamp}/1`;
      const smiteResp = await fetch(getGodsUrl);
      const godsData = await smiteResp.json();
      godsData.forEach((god) => {
        GodModel.updateOne(
          { id: god.id },
          god,
          { upsert: true },
          function (err) {
            if (err) console.error(err);
          }
        );
      });
      const gods = await GodModel.find();
      resp.json(gods);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/gods/:id", async (req, resp) => {
  try {
    const godId = req.params.id;
    if (!session) {
      console.log("no smite api session created, only grabbing god from db");
      const god = await GodModel.find({ id: godId });
      resp.json(god);
    } else {
      console.log("fetching skins from api");
      const timeStamp = DateTime.utc().toFormat("yyyyMMddhhmmss");
      const signature = createSignature("getgodskins", timeStamp);
      const getGodSkinsUrl = `${apiUrl}/getgodskinsjson/${devId}/${signature}/${session}/${timeStamp}/${godId}/1`;
      const smiteResp = await fetch(getGodSkinsUrl);
      const skinsData = await smiteResp.json();
      GodModel.updateOne(
        { id: godId },
        { skins: skinsData },
        { upsert: true },
        function (err) {
          if (err) console.error(err);
        }
      );
      const god = await GodModel.find({ id: godId });
      resp.json(god);
    }
  } catch (error) {
    console.error(error);
  }
});

app.get("/getitems", async (req, resp) => {
  try {
    if (!session) {
      console.log("no smite api session, only grabbing from db");
      const items = await ItemModel.find();
      resp.json(items);
    } else {
      console.log("getting items");
      const timeStamp = DateTime.utc().toFormat("yyyyMMddhhmmss");
      const signature = createSignature("getitems", timeStamp);
      const getItemsUrl = `${apiUrl}/getitemsjson/${devId}/${signature}/${session}/${timeStamp}/1`;
      const smiteResp = await fetch(getItemsUrl);
      const itemsData = await smiteResp.json();
      itemsData.forEach((item) => {
        if (item.ActiveFlag === "y") {
          ItemModel.replaceOne(
            { ItemId: item.ItemId },
            item,
            { upsert: true },
            function (err) {
              if (err) console.error(err);
            }
          );
        } else if (item.ActiveFlag === "n") {
          ItemModel.deleteOne({ ItemId: item.ItemId }, function (err) {
            if (err) console.error(err);
          });
        }
      });
      const items = await ItemModel.find();
      resp.json(items);
    }
  } catch (error) {
    console.error(error);
  }
});

app.get("/items/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    const item = await ItemModel.find({ ItemId: id });
    console.log(item);
    resp.json(item);
  } catch (err) {
    console.error(err);
  }
});

// creating a session only works after 9pm est for some reason, severly limits ability to get a player, not worth saving any users in database
// app.get("/getplayer", async (req, resp) => {
//   try {

//   } catch (err) {
//     console.error(err);
//   }
// });
