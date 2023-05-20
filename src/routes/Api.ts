import express from "express";

import serverPing from "../api/serverPing";

const router = express.Router();

//check server health
router.use((_req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

//server ping, returns timestamp
router.get("/", (_req, resp) => {
  try {
    resp.json(serverPing());
  } catch (error) {
    console.log(error);
  }
});

router.get("/ping", (_req, res) => {
  return res.send("pong 🏓");
});

router.get("/health", (_req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
});

export default router;
