import mongoose from "mongoose";
import "dotenv/config";

import patchUpdater from "../db/patchUpdater";
import articleUpdater from "../db/articleUpdater";

const databaseUrl = process.env.dataBaseUrl;

const updaterCron = async () => {
  console.log("running cron job");

  mongoose.set("strictQuery", true);
  mongoose.connect(databaseUrl);

  // await patchUpdater();
  await articleUpdater();
};

module.exports.handler = updaterCron;
