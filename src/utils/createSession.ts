import { DateTime } from "luxon";
import createSignature from "./createSignature";
import "dotenv/config";

const apiUrl = process.env.apiUrl;

const createSession = async (session) => {
  if (!session) {
    const devId = process.env.devId;
    const signature = createSignature("createsession");
    const timeStamp = DateTime.utc().toFormat("yyyyMMddhhmmss");
    const createSessionUrl = `${apiUrl}/createsessionjson/${devId}/${signature}/${timeStamp}`;
    const smiteSessionCreateResp = await fetch(createSessionUrl);
    const sessionData = await smiteSessionCreateResp.json();

    return (session = sessionData.session_id);
  } else {
    return session;
  }
};

export default createSession;
