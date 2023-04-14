import fetch from "node-fetch";
import { DateTime } from "luxon";
import "dotenv/config";

import createSignature from "../utils/createSignature";
import GodModel from "../schema/godSchema";

import { session } from "./session";

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;

const godFetch = async () => {
  console.log("getting gods");
  const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  const signature = createSignature("getgods", timeStamp);
  const getGodsUrl = `${apiUrl}/getgodsjson/${devId}/${signature}/${session}/${timeStamp}/1`;
  const smiteResp = await fetch(getGodsUrl);
  const godsData = await smiteResp.json();

  godsData.forEach(async (god) => {
    GodModel.updateOne({ id: god.id }, god, { upsert: true }, function (err) {
      if (err) console.error(err);
    });
    const signature = createSignature("getgodskins", timeStamp);
    const getGodSkinsUrl = `${apiUrl}/getgodskinsjson/${devId}/${signature}/${session}/${timeStamp}/${god.id}/1`;
    const smiteResp = await fetch(getGodSkinsUrl);
    const skinsData = await smiteResp.json();
    GodModel.updateOne(
      { id: god.id },
      { skins: skinsData },
      { upsert: true },
      function (err) {
        if (err) console.error(err);
      }
    );
  });
  console.log("updated gods");
};

export default godFetch;
