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

//list of matches
// {
//   ActiveId1: 25609,
//   ActiveId2: 25652,
//   Active_1: 'Greater Purification Beads',
//   Active_2: 'Aegis Amulet',
//   Active_3: null,
//   Assists: 6,
//   Ban1: '',
//   Ban10: '',
//   Ban10Id: 0,
//   Ban11: '',
//   Ban11Id: 0,
//   Ban12: '',
//   Ban12Id: 0,
//   Ban1Id: 0,
//   Ban2: '',
