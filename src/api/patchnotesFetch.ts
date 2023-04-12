import fetch from "node-fetch";
import { DateTime } from "luxon";
import "dotenv/config";

import createSignature from "../utils/createSignature";

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;

const patchnoteFetch = async (session) => {
  const timestamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  const signature = createSignature("getpatchinfo", timestamp);
  const patchNotesUrl = `${apiUrl}/getpatchinfojson/${devId}/${signature}/${session}/${timestamp}`;
  const patchNoteResp = await fetch(patchNotesUrl);
  const data = await patchNoteResp.json();
  return data;
};

export default patchnoteFetch;
