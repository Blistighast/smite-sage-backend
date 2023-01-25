import { createHash } from "crypto";
import { DateTime } from "luxon";
import "dotenv/config";

const createSignature = () => {
  const timeStamp = DateTime.utc().toFormat("yyyyMMddhhmmss");
  const devId = process.env.devId;
  const authKey = process.env.authKey;
  const unhashed = `${devId}createsession${authKey}${timeStamp}`;
  const signature = createHash("MD5").update(unhashed).digest("hex");

  return signature;
};

export default createSignature;
