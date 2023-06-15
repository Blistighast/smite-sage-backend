import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

// Routes
import apiRouter from "./routes/Api";
import smiteApiRouter from "./routes/SmiteApi";
import godsRouter from "./routes/Gods";
import itemsRouter from "./routes/Items";
import playerRouter from "./routes/Player";
import articleRouter from "./routes/Article";

const app = express();
const port = process.env.PORT || 4000;

const databaseUrl = process.env.dataBaseUrl;

app.listen(port, () => console.log(`listening on port ${port}`));
app.use(
  cors({
    origin: [process.env.frontendUrl || "http://localhost:3000"],
  })
);

// to stop mongoose warning of future mongoose update
mongoose.set("strictQuery", true);
mongoose.connect(databaseUrl);

//check if version has changed once every 24 hours, if yes update gods & items, check if any new article released
// cron.schedule("0 0 * * *", async () => {
//   await patchUpdater();
//   await articleUpdater();
// });

// setInterval(async () => {
// await patchUpdater();
// await articleUpdater();
// }, 1000 * 60 * 60 * 24);

app.get("/", (_req, res) => {
  try {
    res.send("Smite Sage API");
  } catch (err) {
    console.error(err);
  }
});

app.use("/api", apiRouter);

app.use("/smiteapi", smiteApiRouter);

app.use("/gods", godsRouter);

app.use("/items", itemsRouter);

app.use("/player", playerRouter);

app.use("/article", articleRouter);

//updates db
// app.get("/devmanualupdate", async (_req, resp) => {
//   try {
//     await createSession();
//     const newPatch = await patchnoteFetch();
//     // await godFetch();
//     // await itemFetch();

//     console.log("saved patch-", newPatch);
//     resp.json(newPatch);
//   } catch (err) {
//     console.error(err);
//   }
// });
