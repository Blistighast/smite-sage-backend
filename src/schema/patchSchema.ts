import mongoose from "mongoose";

const patchSchema = new mongoose.Schema({
  version: String,
  newGod: String,
});

const PatchModel = mongoose.model("patch", patchSchema);

export default PatchModel;
