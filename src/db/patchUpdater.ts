import godFetch from "../api/godFetch";
import itemFetch from "../api/itemFetch";
import patchnoteFetch from "../api/patchnotesFetch";

import PatchModel from "../schema/patchSchema";

const patchUpdater = async () => {
  console.log("checking for version number change");

  const latestSavedPatch = await PatchModel.find()
    .sort({ createdAt: -1 })
    .limit(1);
  const newPatch = await patchnoteFetch();

  console.log("dbPatch-", latestSavedPatch, "newPatch-", newPatch);
  if (latestSavedPatch[0].version === newPatch) {
    console.log(
      `no new patch, staying on patch ${latestSavedPatch[0].version}`
    );
    return newPatch;
  }

  await PatchModel.create({ version: newPatch });
  await godFetch();
  await itemFetch();

  console.log(`updated version to ${newPatch}`);
  return newPatch;
};

export default patchUpdater;
