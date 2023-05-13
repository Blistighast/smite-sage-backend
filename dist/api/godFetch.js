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
const node_fetch_1 = __importDefault(require("node-fetch"));
const luxon_1 = require("luxon");
require("dotenv/config");
const createSignature_1 = __importDefault(require("../utils/createSignature"));
const godSchema_1 = __importDefault(require("../schema/godSchema"));
const session_1 = require("./session");
const apiUrl = process.env.apiUrl;
const devId = process.env.devId;
const godFetch = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getting gods");
    const timeStamp = luxon_1.DateTime.utc().toFormat("yyyyMMddHHmmss");
    const signature = (0, createSignature_1.default)("getgods", timeStamp);
    const getGodsUrl = `${apiUrl}/getgodsjson/${devId}/${signature}/${session_1.session}/${timeStamp}/1`;
    const smiteResp = yield (0, node_fetch_1.default)(getGodsUrl);
    const godsData = yield smiteResp.json();
    godsData.forEach((god) => __awaiter(void 0, void 0, void 0, function* () {
        godSchema_1.default.updateOne({ id: god.id }, god, { upsert: true }, function (err) {
            if (err)
                console.error(err);
        });
        const signature = (0, createSignature_1.default)("getgodskins", timeStamp);
        const getGodSkinsUrl = `${apiUrl}/getgodskinsjson/${devId}/${signature}/${session_1.session}/${timeStamp}/${god.id}/1`;
        const smiteResp = yield (0, node_fetch_1.default)(getGodSkinsUrl);
        const skinsData = yield smiteResp.json();
        godSchema_1.default.updateOne({ id: god.id }, { skins: skinsData }, { upsert: true }, function (err) {
            if (err)
                console.error(err);
        });
    }));
    console.log("updated gods");
});
exports.default = godFetch;
//# sourceMappingURL=godFetch.js.map