import fetch from "node-fetch";
import { DateTime } from "luxon";
import "dotenv/config";

import createSignature from "../utils/createSignature";
import createSession from "../utils/createSession";
import { session } from "./session";

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;

const playerMatchFetch = async (playerId) => {
  await createSession();
  const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  const signature = createSignature("getmatchhistory", timeStamp);
  const getPlayerMatchUrl = `${apiUrl}/getmatchhistoryjson/${devId}/${signature}/${session}/${timeStamp}/${playerId}`;
  const playerMatchResp = await fetch(getPlayerMatchUrl);
  const playerMatchData = await playerMatchResp.json();
  console.log(playerMatchData);
  return playerMatchData;
};

export default playerMatchFetch;
