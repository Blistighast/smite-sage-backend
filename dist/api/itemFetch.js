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
const itemSchema_1 = __importDefault(require("./../schema/itemSchema"));
const session_1 = require("./session");
const apiUrl = process.env.apiUrl;
const devId = process.env.devId;
const itemFetch = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getting items");
    const timeStamp = luxon_1.DateTime.utc().toFormat("yyyyMMddHHmmss");
    const signature = (0, createSignature_1.default)("getitems", timeStamp);
    const getItemsUrl = `${apiUrl}/getitemsjson/${devId}/${signature}/${session_1.session}/${timeStamp}/1`;
    const smiteResp = yield (0, node_fetch_1.default)(getItemsUrl);
    const itemsData = yield smiteResp.json();
    itemsData.forEach((item) => {
        if (item.ActiveFlag === "y") {
            itemSchema_1.default.replaceOne({ ItemId: item.ItemId }, item, { upsert: true }, function (err) {
                if (err)
                    console.error(err);
            });
        }
        else if (item.ActiveFlag === "n") {
            itemSchema_1.default.deleteOne({ ItemId: item.ItemId }, function (err) {
                if (err)
                    console.error(err);
            });
        }
    });
    console.log("updated items");
});
exports.default = itemFetch;
//# sourceMappingURL=itemFetch.js.map