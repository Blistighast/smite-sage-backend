import fetch from "node-fetch";
import { DateTime } from "luxon";
import "dotenv/config";

import createSignature from "../utils/createSignature";
import recommendedItemModel from "../schema/recommendedItemSchema";

import { session } from "./session";

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;

const recommendedItemFetch = async (godId) => {
  console.log(`getting ${godId}'s recommended items`);
  const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  const signature = createSignature("getgodrecommendeditems", timeStamp);
  const getRecommendedItemsUrl = `${apiUrl}/getgodrecommendeditemsjson/${devId}/${signature}/${session}/${timeStamp}/${godId}/1`;
  const recommendedItemResp = await fetch(getRecommendedItemsUrl);
  const recommendedItemData = await recommendedItemResp.json();

  console.log(recommendedItemData[0]);
  return recommendedItemData;
};

export default recommendedItemFetch;
