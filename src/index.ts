import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { DateTime } from "luxon";
import "dotenv/config";

//custom functions
import createSignature from "./utils/createSignature";

const app = express();
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const apiUrl = "https://api.smitegame.com/smiteapi.svc";

//server ping, returns timestamp
app.get("/api", (req, resp) => {
  try {
    console.log("I got a ping!");

    const timeStamp = Date.now();
    resp.json(timeStamp);
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
    resp.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/createsession", async (req, resp) => {
  try {
    console.log("createSession");

    const devId = process.env.devId;
    const authKey = process.env.authKey;
    const signature = createSignature();
    const timeStamp = DateTime.utc().toFormat("yyyyMMddhhmmss");
    const createSessionUrl = `${apiUrl}/createsessionjson/${devId}/${signature}/${timeStamp}`;
    const smiteSessionCreateResp = await fetch(createSessionUrl);
    const sessionData = await smiteSessionCreateResp.json();
    resp.json(sessionData);
  } catch (error) {
    console.log(error);
  }
});
