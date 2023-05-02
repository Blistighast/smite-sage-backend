import fetch from "node-fetch";
import { DateTime } from "luxon";
import createSignature from "./createSignature";
import "dotenv/config";

import { session, sessionUpdater, sessionTimeouter } from "../api/session";

const apiUrl = process.env.apiUrl;

const createSession = async () => {
  if (!session) {
    console.log("no session, creating session");
    const devId = process.env.devId;
    const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
    const signature = createSignature("createsession", timeStamp);
    const createSessionUrl = `${apiUrl}/createsessionjson/${devId}/${signature}/${timeStamp}`;
    const smiteSessionCreateResp = await fetch(createSessionUrl);
    const sessionData = await smiteSessionCreateResp.json();

    sessionTimeouter();

    sessionUpdater(sessionData.session_id);
  }
  console.log("session", session);
  return;
};

export default createSession;
