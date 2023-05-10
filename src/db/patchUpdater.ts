import godFetch from "../api/godFetch";
import itemFetch from "../api/itemFetch";
import patchnoteFetch from "../api/patchnotesFetch";
import createSession from "../utils/createSession";

const patchUpdater = async (currentPatch) => {
  console.log("checking for version number change");
  await createSession();
  const newPatch = await patchnoteFetch();

  console.log("current patch-", currentPatch, "updated patch-", newPatch);
  if (newPatch !== currentPatch) {
    await godFetch();
    await itemFetch();
  }
  return newPatch;
};

export default patchUpdater;
