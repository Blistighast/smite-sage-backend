"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skinSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.skinSchema = new mongoose_1.default.Schema({
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
exports.skinSchema.set("timestamps", true);
const SkinModel = mongoose_1.default.model("Skin", exports.skinSchema);
exports.default = SkinModel;
//# sourceMappingURL=skinSchema.js.map