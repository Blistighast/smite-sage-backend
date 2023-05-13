"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const recommendedItemSchema = new mongoose_1.default.Schema({
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
const recommendedItemModel = mongoose_1.default.model("Skin", recommendedItemSchema);
exports.default = recommendedItemModel;
//# sourceMappingURL=recommendedItemSchema.js.map