"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const articleSchema = new mongoose_1.default.Schema({
    type: String,
    articleUrl: String,
    headline: String,
    datePosted: String,
    imageUrl: String,
});
articleSchema.set("timestamps", true);
const ArticleModel = mongoose_1.default.model("article", articleSchema);
exports.default = ArticleModel;
//# sourceMappingURL=articleSchema.js.map