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
const puppeteer_1 = __importDefault(require("puppeteer"));
const getDateFromTimeAgo_1 = __importDefault(require("./getDateFromTimeAgo"));
let retry = 0;
let maxRetries = 5;
const webScraper = () => __awaiter(void 0, void 0, void 0, function* () {
    const newsUrl = "https://www.smitegame.com/news/";
    console.log(`scraping ${newsUrl}`);
    retry++;
    const browser = yield puppeteer_1.default.launch({
        headless: "new",
    });
    try {
        const page = yield browser.newPage();
        yield page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36");
        yield page.goto(newsUrl);
        yield page.waitForSelector(".home-tile");
        const articleTiles = yield page.evaluate(() => {
            const tileElements = document.body.querySelectorAll(".posts-wrapper a");
            const articleTiles = Object.values(tileElements)
                .map((tile) => {
                var _a;
                const baseUrl = "https://www.smitegame.com";
                const subhead = (_a = tile.querySelector(".subhead.right").textContent) !== null && _a !== void 0 ? _a : null;
                const article = {
                    articleUrl: `${baseUrl}${tile.getAttribute("href")}`,
                    headline: tile.querySelector(".headline").textContent,
                    datePosted: tile.querySelector(".subhead.left").textContent,
                };
                if (subhead === "Console,Dev Insights" &&
                    tile.querySelector(".headline").textContent.includes("Bonus")) {
                    return Object.assign({ type: "minorPatchInfo" }, article);
                }
                else if (subhead === "Console,Dev Insights") {
                    return Object.assign({ type: "majorPatchInfo" }, article);
                }
                else if (subhead === "Dev Insights,Gods") {
                    return Object.assign({ type: "godInfo" }, article);
                }
                else if (subhead === "Dev Insights,News") {
                    return Object.assign({ type: "seasonInfo" }, article);
                }
                else {
                    return;
                }
            })
                .filter((tile) => tile);
            return articleTiles;
        });
        const articles = [];
        for (let article of articleTiles) {
            try {
                let page = yield browser.newPage();
                console.log(`scraping ${article.headline}`);
                yield page.goto(article.articleUrl, { waitUntil: "load" });
                yield page.waitForSelector(".featured-image");
                const articleImage = yield page.evaluate(() => {
                    const articleImageElement = document.body.querySelector(".featured-image");
                    const articleImageUrl = articleImageElement.getAttribute("style");
                    return articleImageUrl.split('"')[1];
                });
                articles.push(Object.assign(Object.assign({}, article), { datePosted: (0, getDateFromTimeAgo_1.default)(article.datePosted), imageUrl: articleImage }));
            }
            catch (err) {
                console.error(err);
            }
        }
        yield browser.close();
        return articles;
    }
    catch (err) {
        console.error(err);
        yield browser.close();
        console.log("scrape failed");
        if (retry < maxRetries) {
            console.log("retrying scrape");
            webScraper();
        }
    }
});
exports.default = webScraper;
//# sourceMappingURL=webScraper.js.map