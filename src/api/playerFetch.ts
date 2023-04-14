import fetch from "node-fetch";
import { DateTime } from "luxon";
import "dotenv/config";

import createSignature from "../utils/createSignature";
import createSession from "../utils/createSession";
import { session } from "./session";

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;

const playerFetch = async (playerName) => {
  await createSession();

  const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  const signature = createSignature("getplayer", timeStamp);
  const getPlayerUrl = `${apiUrl}/getplayerjson/${devId}/${signature}/${session}/${timeStamp}/${playerName}`;
  const playerResp = await fetch(getPlayerUrl);
  const playerData = await playerResp.json();
  return playerData;
};

export default playerFetch;
