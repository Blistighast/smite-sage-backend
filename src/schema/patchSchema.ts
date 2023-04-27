import mongoose from "mongoose";

const patchSchema = new mongoose.Schema({
  version: String,
  newGod: String,
  patchNotesURL: String,
});

const patchModel = mongoose.model("patch", patchSchema);

export default patchModel;
