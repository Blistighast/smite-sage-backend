import fetch from "node-fetch";
import "dotenv/config";

const apiUrl = process.env.apiUrl;

const smiteApiPing = async () => {
  console.log("I got a smite ping!");
  const smitePingUrl = `${apiUrl}/pingjson`;
  const smitePingCall = await fetch(smitePingUrl);
  const data = await smitePingCall.json();
  return data;
};

export default smiteApiPing;
