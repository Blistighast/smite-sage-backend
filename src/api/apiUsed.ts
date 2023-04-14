import fetch from "node-fetch";
import { DateTime } from "luxon";
import "dotenv/config";

import createSignature from "../utils/createSignature";
import createSession from "../utils/createSession";
import { session } from "./session";
// const session = require("./session").session;

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;

const apiUsed = async () => {
  await createSession();
  const timestamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  const signature = createSignature("getdataused", timestamp);
  const dataUsedUrl = `${apiUrl}/getdatausedjson/${devId}/${signature}/${session}/${timestamp}`;
  const dataUsedResp = await fetch(dataUsedUrl);
  const data = await dataUsedResp.json();
  return data;
};

export default apiUsed;
