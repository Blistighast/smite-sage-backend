import fetch from "node-fetch";
import { DateTime } from "luxon";
import createSignature from "./createSignature";
import "dotenv/config";

const apiUrl = process.env.apiUrl;

const createSession = async () => {
  if (!global.session) {
    console.log("no session, creating session");
    const devId = process.env.devId;
    const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
    const signature = createSignature("createsession", timeStamp);
    const createSessionUrl = `${apiUrl}/createsessionjson/${devId}/${signature}/${timeStamp}`;
    const smiteSessionCreateResp = await fetch(createSessionUrl);
    const sessionData = await smiteSessionCreateResp.json();

    console.log("setting timeout");
    setTimeout(() => {
      console.log("nulling session");
      global.session = null;
    }, 1000 * 60 * 14);

    global.session = sessionData.session_id;
    console.log("session", global.session);
  }
  return;
};

export default createSession;

//old way of doing session without globalVariable, in case I shouldnt use globalVariable later
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
