import { DateTime } from "luxon";
import "dotenv/config";

import createSignature from "src/utils/createSignature";
import ItemModel from "./../schema/itemSchema";

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;

const itemFetch = async (session) => {
  console.log("getting items");
  const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  const signature = createSignature("getitems", timeStamp);
  const getItemsUrl = `${apiUrl}/getitemsjson/${devId}/${signature}/${session}/${timeStamp}/1`;
  const smiteResp = await fetch(getItemsUrl);
  const itemsData = await smiteResp.json();

  itemsData.forEach((item) => {
    if (item.ActiveFlag === "y") {
      ItemModel.replaceOne(
        { ItemId: item.ItemId },
        item,
        { upsert: true },
        function (err) {
          if (err) console.error(err);
        }
      );
    } else if (item.ActiveFlag === "n") {
      ItemModel.deleteOne({ ItemId: item.ItemId }, function (err) {
        if (err) console.error(err);
      });
    }
  });
  console.log("updated items");
};

export default itemFetch;
