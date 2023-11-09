import cron from "node-cron";

import patchUpdater from "../db/patchUpdater";
import articleUpdater from "../db/articleUpdater";

//check if version has changed once every 24 hours, if yes update gods & items, check if any new article released
// cron.schedule("0 0 * * *", async () => {
//   console.log("running cron job")
//   await patchUpdater();
//   await articleUpdater();
// });

const updaterCron = async () => {
  console.log("running cron job");
  await patchUpdater();
  await articleUpdater();
};

// const updaterCron = cron.schedule("*/10 * * * *", async () => {
//   console.log("running cron job");
//   // await patchUpdater();
//   // await articleUpdater();
// });

module.exports.handler = updaterCron;

// setInterval(async () => {
// await patchUpdater();
// await articleUpdater();
// }, 1000 * 60 * 60 * 24);
