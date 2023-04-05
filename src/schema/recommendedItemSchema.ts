import mongoose from "mongoose";

//schema
const recommendedItemSchema = new mongoose.Schema({
  Category: String,
  Item: String,
  Role: String,
  category_value_id: Number,
  god_id: Number,
  god_Name: String,
  icon_id: Number,
  item_id: Number,
  role_value_id: Number,
});

//model
const recommendedItemModel = mongoose.model("Skin", recommendedItemSchema);

export default recommendedItemModel;
