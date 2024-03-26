import fetch from "node-fetch";
import { DateTime } from "luxon";
import "dotenv/config";

import createSignature from "../utils/createSignature";
import createSession from "../utils/createSession";
import { session } from "./session";

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;

const playerGodFetch = async (playerId) => {
  await createSession();
  const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  const signature = createSignature("getgodranks", timeStamp);
  const getPlayerGodUrl = `${apiUrl}/getgodranksjson/${devId}/${signature}/${session}/${timeStamp}/${playerId}`;
  const playerGodResp = await fetch(getPlayerGodUrl);
  const playerGodData = await playerGodResp.json();
  return playerGodData;
};

export default playerGodFetch;

// example data :
// {
//   Assists: 49,
//   Deaths: 17,
//   Kills: 21,
//   Losses: 4,
//   MinionKills: 406,
//   Rank: 1,
//   Wins: 4,
//   Worshippers: 82,
//   god: 'Tyr',
//   god_id: '1924',
//   player_id: '709171487',
//   ret_msg: null
// },
