import { DateTime } from "luxon";
import createSignature from "./createSignature";
import "dotenv/config";

const apiUrl = process.env.apiUrl;

const createSession = async (session) => {
  if (!session) {
    const devId = process.env.devId;
    const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
    const signature = createSignature("createsession", timeStamp);
    const createSessionUrl = `${apiUrl}/createsessionjson/${devId}/${signature}/${timeStamp}`;
    const smiteSessionCreateResp = await fetch(createSessionUrl);
    const sessionData = await smiteSessionCreateResp.json();
    console.log(sessionData);
    //might come back to adding timeout to createSession
    // if (timeout) {
    //   //refresh 15 minute timer if another session is made before it is done
    //   clearTimeout(timeout);
    // }
    // console.log("setting timeout");
    // // timeout = setTimeout(() => (session = null), 1000 * 60 * 14);
    // timeout = setTimeout(() => (session = null), 1000 * 5);
    return (session = sessionData.session_id);
  } else {
    return session;
  }
};

export default createSession;
