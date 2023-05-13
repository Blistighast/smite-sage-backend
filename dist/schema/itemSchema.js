"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema = new mongoose_1.default.Schema({
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
itemSchema.set("timestamps", true);
const ItemModel = mongoose_1.default.model("Item", itemSchema);
exports.default = ItemModel;
//# sourceMappingURL=itemSchema.js.map