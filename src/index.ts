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
import smiteApiPing from "./api/apiPing";
import serverPing from "./api/serverPing";
import sessionTest from "./api/sessionTest";
import patchnoteFetch from "./api/patchnotesFetch";
import apiUsed from "./api/apiUsed";

// import session from "./api/session"

const app = express();
const port = process.env.PORT || 4000;

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;
const databaseUrl = process.env.dataBaseUrl;
let session = null;
// global.session = null;
let timeout;
let patchNumber = null;

app.listen(port, () => console.log(`listening on port ${port}`));
app.use(
  cors({
    origin: [process.env.frontendUrl],
  })
);

// to stop mongoose warning of future mongoos update
mongoose.set("strictQuery", true);
mongoose.connect(databaseUrl);

//check if version has changed once every 24 hours, if yes update gods & items
// setInterval(async () => {
//   console.log("checking for version number change");
//   session = await createSession(session);
//   if (timeout) {
//     //refresh 15 minute timer if another call is made before it is done
//     clearTimeout(timeout);
//   }
//   console.log("setting timeout");
//   timeout = setTimeout(() => (session = null), 1000 * 60 * 14);
//   const timestamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
//   const signature = createSignature("getpatchinfo", timestamp);
//   const patchNotesUrl = `${apiUrl}/getpatchinfojson/${devId}/${signature}/${session}/${timestamp}`;
//   const patchNoteResp = await fetch(patchNotesUrl);
//   const patchData = await patchNoteResp.json();
//   console.log(
//     "current patch-",
//     patchNumber,
//     "updated patch-",
//     patchData.version_string
//   );
//   if (patchData.version_string !== patchNumber) {
//     console.log("getting gods");
//     const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
//     const signature = createSignature("getgods", timeStamp);
//     const getGodsUrl = `${apiUrl}/getgodsjson/${devId}/${signature}/${session}/${timeStamp}/1`;
//     const smiteResp = await fetch(getGodsUrl);
//     const godsData = await smiteResp.json();
//     godsData.forEach(async (god) => {
//       GodModel.updateOne({ id: god.id }, god, { upsert: true }, function (err) {
//         if (err) console.error(err);
//       });
//       const signature = createSignature("getgodskins", timeStamp);
//       const getGodSkinsUrl = `${apiUrl}/getgodskinsjson/${devId}/${signature}/${session}/${timeStamp}/${god.id}/1`;
//       const smiteResp = await fetch(getGodSkinsUrl);
//       const skinsData = await smiteResp.json();
//       GodModel.updateOne(
//         { id: god.id },
//         { skins: skinsData },
//         { upsert: true },
//         function (err) {
//           if (err) console.error(err);
//         }
//       );
//     });
//   }
//   patchNumber = patchData.version_string;
// }, 1000 * 60 * 60 * 24);

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
    const data = await smiteApiPing();
    console.log(data);
    resp.json(data);
  } catch (error) {
    console.log(error);
  }
});

//create a session to be able to get more info from smite api
app.get("/createsession", async (req, resp) => {
  try {
    console.log("creating Session", session);
    // await createSession();

    //smite api sessions can only last 15 min, so need to create a new one before then
    //this could make multiple setTimeouts, if called in succession, deleting a session
    // before it needs to be, which would make unnessary calls to the smite api
    // need to fix later
    // console.log("setting the timeout");
    // if (timeout) {
    //   //refresh 15 minute timer if another call is made before it is done
    //   clearTimeout(timeout);
    // }
    // timeout = setTimeout(() => (session = null), 1000 * 60 * 14); //reset the session after 14 min
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
      const data = await sessionTest(session);
      console.log(data);
      resp.json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/patchnotes", async (req, resp) => {
  try {
    const data = await patchnoteFetch(session);
    resp.json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/getuseddata", async (req, resp) => {
  try {
    // const timestamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
    // const signature = createSignature("getdataused", timestamp);
    // const dataUsedUrl = `${apiUrl}/getdatausedjson/${devId}/${signature}/${session}/${timestamp}`;
    // const dataUsedResp = await fetch(dataUsedUrl);
    // const data = await dataUsedResp.json();
    const data = await apiUsed();
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
      const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
      const signature = createSignature("getgods", timeStamp);
      const getGodsUrl = `${apiUrl}/getgodsjson/${devId}/${signature}/${session}/${timeStamp}/1`;
      const smiteResp = await fetch(getGodsUrl);
      const godsData = await smiteResp.json();
      godsData.forEach(async (god) => {
        GodModel.updateOne(
          { id: god.id },
          god,
          { upsert: true },
          function (err) {
            if (err) console.error(err);
          }
        );
        const signature = createSignature("getgodskins", timeStamp);
        const getGodSkinsUrl = `${apiUrl}/getgodskinsjson/${devId}/${signature}/${session}/${timeStamp}/${god.id}/1`;
        const smiteResp = await fetch(getGodSkinsUrl);
        const skinsData = await smiteResp.json();
        GodModel.updateOne(
          { id: god.id },
          { skins: skinsData },
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
      const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
      const skinSignature = createSignature("getgodskins", timeStamp);
      const getGodSkinsUrl = `${apiUrl}/getgodskinsjson/${devId}/${skinSignature}/${session}/${timeStamp}/${godId}/1`;
      const skinsResp = await fetch(getGodSkinsUrl);
      const skinsData = await skinsResp.json();
      const recommendedItemsSignature = createSignature(
        "getgodrecommendeditems",
        timeStamp
      );
      const getrecommendedItemsUrl = `${apiUrl}/getgodrecommendeditemsjson/${devId}/${recommendedItemsSignature}/${session}/${timeStamp}/${godId}/1`;
      const recommendedItemsResp = await fetch(getrecommendedItemsUrl);
      const recommendedItemsData = await recommendedItemsResp.json();
      console.log(recommendedItemsData);
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
      const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
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

// app.get("/getplayer/:playername", async (req, resp) => {
//   try {
//     const playerName = req.params.playername;
//     if (!session) {
//       session = await createSession(session);
//       if (timeout) {
//         //refresh 15 minute timer if another call is made before it is done
//         clearTimeout(timeout);
//       }
//       console.log("setting timeout");
//       timeout = setTimeout(() => (session = null), 1000 * 60 * 14);
//     }
//     const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
//     const signature = createSignature("getplayer", timeStamp);
//     const getPlayerUrl = `${apiUrl}/getplayerjson/${devId}/${signature}/${session}/${timeStamp}/${playerName}`;
//     const playerResp = await fetch(getPlayerUrl);
//     const playerData = await playerResp.json();
//     resp.json(playerData);
//   } catch (err) {
//     console.error(err);
//   }
// });
