import { createHash } from "crypto";
import { DateTime } from "luxon";
import "dotenv/config";

const createSignature = (method, timeStamp) => {
  const devId = process.env.devId;
  const authKey = process.env.authKey;
  const unhashed = `${devId}${method}${authKey}${timeStamp}`;
  const signature = createHash("MD5").update(unhashed).digest("hex");

  return signature;
};

export default createSignature;
