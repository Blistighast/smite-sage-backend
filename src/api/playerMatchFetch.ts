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
//   Ban2Id: 0,
//   Ban3: '',
//   Ban3Id: 0,
//   Ban4: '',
//   Ban4Id: 0,
//   Ban5: '',
//   Ban5Id: 0,
//   Ban6: '',
//   Ban6Id: 0,
//   Ban7: '',
//   Ban7Id: 0,
//   Ban8: '',
//   Ban8Id: 0,
//   Ban9: '',
//   Ban9Id: 0,
//   Creeps: 58,
//   Damage: 14331,
//   Damage_Bot: 23883,
//   Damage_Done_In_Hand: 8293,
//   Damage_Mitigated: 9011,
//   Damage_Structure: 315,
//   Damage_Taken: 19480,
//   Damage_Taken_Magical: 5589,
//   Damage_Taken_Physical: 13424,
//   Deaths: 5,
//   Distance_Traveled: 323937,
//   First_Ban_Side: '',
//   God: 'Nut',
//   GodId: 4318,
//   Gold: 13110,
//   Healing: 0,
//   Healing_Bot: 0,
//   Healing_Player_Self: 2725,
