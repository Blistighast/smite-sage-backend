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

app.get("/getgods", async (req, resp) => {
  try {
    if (!session) {
      console.log("no smite api session created, only grabbing from db");
      const gods = await GodModel.find();
      resp.json(gods);
    } else {
      console.log("getting heroes");
      const timeStamp = DateTime.utc().toFormat("yyyyMMddhhmmss");
      const signature = createSignature("getgods", timeStamp);
      const getGodsUrl = `${apiUrl}/getgodsjson/${devId}/${signature}/${session}/${timeStamp}/1`;
      const smiteResp = await fetch(getGodsUrl);
      const godsData = await smiteResp.json();
      godsData.forEach((god) => {
        GodModel.replaceOne(
          { id: god.id },
          god,
          { upsert: true },
          function (err) {
            if (err) console.log(err);
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
