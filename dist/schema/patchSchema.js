"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const patchSchema = new mongoose_1.default.Schema({
    version: String,
    newGod: String,
});
patchSchema.set("timestamps", true);
const PatchModel = mongoose_1.default.model("patch", patchSchema);
exports.default = PatchModel;
//# sourceMappingURL=patchSchema.js.map