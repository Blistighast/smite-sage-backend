import fetch from "node-fetch";
import { DateTime } from "luxon";
import "dotenv/config";

import createSignature from "../utils/createSignature";

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;

const sessionTest = async (session) => {
  console.log(`testing ${session} session connection`);
  const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  const signature = createSignature("testsession", timeStamp);
  const testSessionUrl = `${apiUrl}/testsessionjson/${devId}/${signature}/${session}/${timeStamp}`;
  const smiteResp = await fetch(testSessionUrl);
  const data = await smiteResp.json();
  return data;
};

export default sessionTest;
