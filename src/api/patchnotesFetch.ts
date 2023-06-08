import fetch from "node-fetch";
import { DateTime } from "luxon";
import "dotenv/config";

import PatchModel from "../schema/patchSchema";
import createSignature from "../utils/createSignature";
import createSession from "../utils/createSession";
import { session } from "./session";

const apiUrl = process.env.apiUrl;
const devId = process.env.devId;

const patchnoteFetch = async () => {
  if (!session) {
    await createSession();
  }

  const latestSavedPatch = await PatchModel.find()
    .sort({ createdAt: -1 })
    .limit(1);

  const timestamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  const signature = createSignature("getpatchinfo", timestamp);
  const patchNotesUrl = `${apiUrl}/getpatchinfojson/${devId}/${signature}/${session}/${timestamp}`;
  const patchNoteResp = await fetch(patchNotesUrl);
  const data = await patchNoteResp.json();

  if (latestSavedPatch[0].version === data.version_string) {
    console.log(
      `no new patch, staying on patch ${latestSavedPatch[0].version}`
    );
    return data.version_string;
  }

  await PatchModel.create({ version: data.version_string });
  return data.version_string;
};

export default patchnoteFetch;
