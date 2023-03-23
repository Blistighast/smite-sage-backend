import mongoose from "mongoose";

//schema
export const skinSchema = new mongoose.Schema({
  god_id: Number,
  skin_id1: Number,
  skin_id2: Number,
  god_name: String,
  skin_name: String,
  godIcon_URL: String,
  godSkin_URL: String,
  obtainability: String,
  price_favor: Number,
  price_gems: Number,
});

//model
const SkinModel = mongoose.model("Skin", skinSchema);

export default SkinModel;
