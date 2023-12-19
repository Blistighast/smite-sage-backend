import mongoose from "mongoose";
import "dotenv/config";

let conn = null;

const databaseUrl = process.env.dataBaseUrl;

exports.connect = async function () {
  if (conn == null) {
    conn = mongoose
      .connect(databaseUrl, {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => mongoose);

    await conn;
  }

  return conn;
};
