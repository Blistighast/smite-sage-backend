"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const articleSchema_1 = __importDefault(require("../schema/articleSchema"));
const webScraper_1 = __importDefault(require("../utils/webScraper"));
const articleUpdater = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("scraping for new smite articles");
    const articles = yield (0, webScraper_1.default)();
    articles.forEach((article) => __awaiter(void 0, void 0, void 0, function* () {
        const dbarticle = yield articleSchema_1.default.find({
            articleUrl: article.articleUrl,
        });
        if (dbarticle.length) {
            console.log("already exists not adding");
        }
        else {
            console.log("adding article");
            yield articleSchema_1.default.create(article);
        }
    }));
    return articles;
});
exports.default = articleUpdater;
//# sourceMappingURL=articleUpdater.js.map