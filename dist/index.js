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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const node_cron_1 = __importDefault(require("node-cron"));
require("dotenv/config");
const createSession_1 = __importDefault(require("./utils/createSession"));
const articleSchema_1 = __importDefault(require("./schema/articleSchema"));
const patchnotesFetch_1 = __importDefault(require("./api/patchnotesFetch"));
const godFetch_1 = __importDefault(require("./api/godFetch"));
const itemFetch_1 = __importDefault(require("./api/itemFetch"));
const playerFetch_1 = __importDefault(require("./api/playerFetch"));
const patchUpdater_1 = __importDefault(require("./db/patchUpdater"));
const articleUpdater_1 = __importDefault(require("./db/articleUpdater"));
const Api_1 = __importDefault(require("./routes/Api"));
const SmiteApi_1 = __importDefault(require("./routes/SmiteApi"));
const Gods_1 = __importDefault(require("./routes/Gods"));
const Items_1 = __importDefault(require("./routes/Items"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const databaseUrl = process.env.dataBaseUrl;
let currentPatch = null;
app.listen(port, () => console.log(`listening on port ${port}`));
app.use((0, cors_1.default)({
    origin: [process.env.frontendUrl || "http://localhost:3000"],
}));
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(databaseUrl);
node_cron_1.default.schedule("0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const newPatch = yield (0, patchUpdater_1.default)(currentPatch);
    currentPatch = newPatch;
    yield (0, articleUpdater_1.default)();
}));
app.get("/", (_req, res) => {
    try {
        res.send("Smite Sage API");
    }
    catch (err) {
        console.error(err);
    }
});
app.use("/api", Api_1.default);
app.use("/smiteapi", SmiteApi_1.default);
app.use("/gods", Gods_1.default);
app.use("/items", Items_1.default);
app.get("/article/:type", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleType = req.params.type;
        const article = yield articleSchema_1.default.find({ type: articleType })
            .sort({ datePosted: -1 })
            .limit(1);
        resp.json(article);
    }
    catch (err) {
        console.error(err);
    }
}));
app.get("/getplayer/:playername", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield (0, playerFetch_1.default)(req.params.playername);
        resp.json(player);
    }
    catch (err) {
        console.error(err);
    }
}));
app.get("/devmanualupdate", (_req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, createSession_1.default)();
        const newPatch = yield (0, patchnotesFetch_1.default)();
        yield (0, godFetch_1.default)();
        yield (0, itemFetch_1.default)();
        currentPatch = newPatch;
        console.log("updated patch-", newPatch);
        resp.json("updated database");
    }
    catch (err) {
        console.error(err);
    }
}));
app.get("/checkscraper", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield (0, articleUpdater_1.default)());
    }
    catch (err) {
        console.error(err);
    }
}));
//# sourceMappingURL=index.js.map