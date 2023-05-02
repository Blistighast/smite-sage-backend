import godFetch from "src/api/godFetch";
import itemFetch from "src/api/itemFetch";
import GodModel from "src/schema/godSchema";

const updateDB = async (patchVersion) => {
  const godAmount = await GodModel.where().countDocuments();
  const patchInfo = {
    version: patchVersion,
    newGod: null,
    patchNotesURL: null,
  };
  // await godFetch();
  // await itemFetch();
  const newGodAmount = await GodModel.where().countDocuments();
  newGodAmount > godAmount
    ? (patchInfo.newGod = "y")
    : (patchInfo.newGod = "n");
  //add in way to get url from smite site
  console.log(patchInfo);
};

export default updateDB;
