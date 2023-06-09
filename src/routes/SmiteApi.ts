import express from "express";

import createSession from "../utils/createSession";
import smiteApiPing from "../api/apiPing";
import sessionTest from "../api/sessionTest";
import apiUsed from "../api/apiUsed";
import patchnoteFetch from "../api/patchnotesFetch";

import { session } from "../api/session";

const router = express.Router();

//ping the smite api
router.get("/", async (_req, resp) => {
  try {
    resp.json(await smiteApiPing());
  } catch (error) {
    console.log(error);
  }
});

//create a session to be able to get more info from smite api
router.get("/createsession", async (_req, resp) => {
  try {
    await createSession();

    resp.json(session);
  } catch (error) {
    console.log(error);
  }
});

//returns if there is currently a session
router.get("/testsession", async (_req, resp) => {
  try {
    resp.json(await sessionTest());
  } catch (error) {
    console.log(error);
  }
});

//returns current patch version
router.get("/patchnotes", async (_req, resp) => {
  try {
    resp.json(await patchnoteFetch());
  } catch (err) {
    console.log(err);
  }
});

//returns current daily data usage
router.get("/getuseddata", async (_req, resp) => {
  try {
    resp.json(await apiUsed());
  } catch (err) {
    console.error(err);
  }
});

//updates db
router.get("/devmanualupdate", async (_req, resp) => {
  try {
    await createSession();
    const newPatch = await patchnoteFetch();
    // await godFetch();
    // await itemFetch();

    // console.log("updated patch-", newPatch);
    console.log("saved patch-", newPatch);
    resp.json(newPatch);
  } catch (err) {
    console.error(err);
  }
});

export default router;
