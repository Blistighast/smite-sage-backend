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
require("dotenv/config");
const createSession_1 = __importDefault(require("./utils/createSession"));
const godSchema_1 = __importDefault(require("./schema/godSchema"));
const itemSchema_1 = __importDefault(require("./schema/itemSchema"));
const articleSchema_1 = __importDefault(require("./schema/articleSchema"));
const apiPing_1 = __importDefault(require("./api/apiPing"));
const serverPing_1 = __importDefault(require("./api/serverPing"));
const sessionTest_1 = __importDefault(require("./api/sessionTest"));
const patchnotesFetch_1 = __importDefault(require("./api/patchnotesFetch"));
const apiUsed_1 = __importDefault(require("./api/apiUsed"));
const godFetch_1 = __importDefault(require("./api/godFetch"));
const itemFetch_1 = __importDefault(require("./api/itemFetch"));
const playerFetch_1 = __importDefault(require("./api/playerFetch"));
const session_1 = require("./api/session");
const patchUpdater_1 = __importDefault(require("./db/patchUpdater"));
const articleUpdater_1 = __importDefault(require("./db/articleUpdater"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
const port = process.env.PORT || 4000;
const databaseUrl = process.env.dataBaseUrl;
let currentPatch = null;
app.listen(port, () => console.log(`listening on port ${port}`));
app.use((0, cors_1.default)({
    origin: [process.env.frontendUrl || "http://localhost:3000"],
}));
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(databaseUrl);
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET");
    next();
});
router.get("/health", (req, res) => {
    const data = {
        uptime: process.uptime(),
        message: "Ok",
        date: new Date(),
    };
    res.status(200).send(data);
});
app.use("/api", router);
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    const newPatch = yield (0, patchUpdater_1.default)(currentPatch);
    currentPatch = newPatch;
    yield (0, articleUpdater_1.default)();
}), 1000 * 60 * 60 * 24);
app.get("/", (req, res) => {
    try {
        res.send("Smite Sage API");
    }
    catch (err) {
        console.error(err);
    }
});
app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
app.get("/api", (req, resp) => {
    try {
        resp.json((0, serverPing_1.default)());
    }
    catch (error) {
        console.log(error);
    }
});
app.get("/smiteapi", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        resp.json(yield (0, apiPing_1.default)());
    }
    catch (error) {
        console.log(error);
    }
}));
app.get("/createsession", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, createSession_1.default)();
        resp.json(session_1.session);
    }
    catch (error) {
        console.log(error);
    }
}));
app.get("/testsession", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        resp.json(yield (0, sessionTest_1.default)());
    }
    catch (error) {
        console.log(error);
    }
}));
app.get("/patchnotes", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        resp.json(yield (0, patchnotesFetch_1.default)());
    }
    catch (err) {
        console.log(err);
    }
}));
app.get("/getuseddata", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        resp.json(yield (0, apiUsed_1.default)());
    }
    catch (err) {
        console.error(err);
    }
}));
app.get("/getgods", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("grabbing gods list from db");
        const gods = yield godSchema_1.default.find().select("Name Pantheon Roles godCard_URL godIcon_URL id");
        resp.json(gods);
    }
    catch (error) {
        console.log(error);
    }
}));
app.get("/gods/:name", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const godName = req.params.name;
        const god = yield godSchema_1.default.find({ Name: godName });
        resp.json(god);
    }
    catch (error) {
        console.error(error);
    }
}));
app.get("/latestgod", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const god = yield godSchema_1.default.find({ Name: "Ix Chel" });
        resp.json(god);
    }
    catch (error) {
        console.error(error);
    }
}));
app.get("/getitems", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(" grabbing items from db");
        const items = yield itemSchema_1.default.find().select("ItemId DeviceName ItemTier StartingItem itemIcon_URL Glyph Type Price");
        resp.json(items);
    }
    catch (error) {
        console.error(error);
    }
}));
app.get("/items/:name", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemName = req.params.name;
        const item = yield itemSchema_1.default.find({ DeviceName: itemName });
        resp.json(item);
    }
    catch (err) {
        console.error(err);
    }
}));
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
app.get("/devmanualupdate", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
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
app.get("/devcountgods", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const godCount = yield godSchema_1.default.where().countDocuments();
        console.log(godCount);
        resp.json(godCount);
    }
    catch (err) {
        console.error(err);
    }
}));
app.get("/checkscraper", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield (0, articleUpdater_1.default)());
    }
    catch (err) {
        console.error(err);
    }
}));
//# sourceMappingURL=index.js.map