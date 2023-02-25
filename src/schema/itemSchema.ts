import mongoose from "mongoose";

//schema
const itemSchema = new mongoose.Schema({
  ItemId: Number,
  ChildItemId: Number,
  RootItemId: Number,
  DeviceName: String,
  IconId: Number,
  itemIcon_URL: String,
  Type: String,
  Price: Number,
  ShortDesc: String,
  StartingItem: Boolean,
  ItemTier: Number,
  RestrictedRoles: String,
  ActiveFlag: String,
  Glyph: String,
  ItemDescription: {
    Description: String,
    SecondaryDescription: String,
    Menuitems: [
      {
        Description: String,
        Value: String,
      },
      {
        Description: String,
        Value: String,
      },
    ],
  },
});

//model
const ItemModel = mongoose.model("Item", itemSchema);

export default ItemModel;
