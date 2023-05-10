import mongoose from "mongoose";

const patchSchema = new mongoose.Schema({
  version: String,
  newGod: String,
});

// generate createdAt and updatedAt
patchSchema.set("timestamps", true);

const PatchModel = mongoose.model("patch", patchSchema);

export default PatchModel;
