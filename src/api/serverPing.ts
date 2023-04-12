import { DateTime } from "luxon";

const serverPing = () => {
  console.log("I got a server ping!");
  const timeStamp = DateTime.utc().toFormat("yyyyMMddHHmmss");
  return { message: "backend up and running", timeStamp };
};

export default serverPing;
