import fetch from "node-fetch";
import { DateTime } from "luxon";
import "dotenv/config";

import createSignature from "../utils/createSignature";
import { session } from "./session";

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;

const sessionTest = async () => {
  if (!session) {
    console.log("there is no session");
    return { errorMessage: "There is no session" };
  } else {
    console.log(`testing ${session} session connection`);
    const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
    const signature = createSignature("testsession", timeStamp);
    const testSessionUrl = `${apiUrl}/testsessionjson/${devId}/${signature}/${session}/${timeStamp}`;
    const smiteResp = await fetch(testSessionUrl);
    const data = await smiteResp.json();
    console.log(data);
    return data;
  }
};

export default sessionTest;
