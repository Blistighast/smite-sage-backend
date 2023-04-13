import fetch from "node-fetch";
import { DateTime } from "luxon";
import createSignature from "./createSignature";
import "dotenv/config";

const apiUrl = process.env.apiUrl;

const createSession = async (session) => {
  // if (!session) {
  //   console.log("no session, creating session");
  //   const devId = process.env.devId;
  //   const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  //   const signature = createSignature("createsession", timeStamp);
  //   const createSessionUrl = `${apiUrl}/createsessionjson/${devId}/${signature}/${timeStamp}`;
  //   const smiteSessionCreateResp = await fetch(createSessionUrl);
  //   const sessionData = await smiteSessionCreateResp.json();
  //   console.log(sessionData);
  //   //might come back to adding timeout to createSession
  //   // if (timeout) {
  //   //   //refresh 15 minute timer if another session is made before it is done
  //   //   clearTimeout(timeout);
  //   // }
  //   // console.log("setting timeout");
  //   // // timeout = setTimeout(() => (session = null), 1000 * 60 * 14);
  //   // setTimeout(() => console.log("timeout done"), 1000 * 5);
  //   // global.session = sessionData.session_id
  //   return (session = sessionData.session_id);
  // } else {
  //   return session;
  // }
  if (!global.smiteSession) {
    console.log("no session, creating session");
    const devId = process.env.devId;
    const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
    const signature = createSignature("createsession", timeStamp);
    const createSessionUrl = `${apiUrl}/createsessionjson/${devId}/${signature}/${timeStamp}`;
    const smiteSessionCreateResp = await fetch(createSessionUrl);
    const sessionData = await smiteSessionCreateResp.json();

    //might come back to adding timeout to createSession
    // if (timeout) {
    //   //refresh 15 minute timer if another session is made before it is done
    //   clearTimeout(timeout);
    // }
    // // timeout = setTimeout(() => (session = null), 1000 * 60 * 14);
    console.log("setting timeout");
    setTimeout(() => {
      console.log("nulling session", global.smiteSession);
      global.smiteSession = null;
      console.log("session nulled:", global.smiteSession);
    }, 1000 * 5);
    global.smiteSession = sessionData.session_id;
    console.log("the session", global.smiteSession);
  }
  return;
};

export default createSession;
