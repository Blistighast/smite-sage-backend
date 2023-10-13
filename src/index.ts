import serverless from "serverless-http";
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

// app.listen(port, () => console.log(`listening on port ${port}`));
app.use(
  cors({
    origin: [process.env.frontendUrl || "http://localhost:3000"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// to stop mongoose warning of future mongoose update
mongoose.set("strictQuery", true);
mongoose.connect(databaseUrl);

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

// export default serverless(app);

module.exports.handler = serverless(app);
