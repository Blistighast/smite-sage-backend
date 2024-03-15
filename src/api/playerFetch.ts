import fetch from "node-fetch";
import { DateTime } from "luxon";
import "dotenv/config";

import createSignature from "../utils/createSignature";
import createSession from "../utils/createSession";
import { session } from "./session";
import playerGodFetch from "./playerGodsFetch";

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;

const playerFetch = async (playerName) => {
  await createSession();
  console.log(`grabbing player ${playerName} from smite api`);
  const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  const signature = createSignature("getplayer", timeStamp);
  const getPlayerUrl = `${apiUrl}/getplayerjson/${devId}/${signature}/${session}/${timeStamp}/${playerName}`;
  const playerResp = await fetch(getPlayerUrl);
  const playerData = await playerResp.json();
  if (!playerData[0]) {
    playerData[0] = null;
    console.log(`${playerName} not found, returning null`);
    return playerData[0];
  }
  const playerGodData = playerGodFetch(playerData[0].Id);
  console.log(playerGodData);
  return playerData[0];
};

export default playerFetch;
