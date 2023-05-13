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
const session_1 = require("./session");
const apiUrl = process.env.apiUrl;
const devId = process.env.devId;
const patchnoteFetch = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!session_1.session) {
        console.log("make session");
        return { errorMessage: "You need to make a session first" };
    }
    const timestamp = luxon_1.DateTime.utc().toFormat("yyyyMMddHHmmss");
    const signature = (0, createSignature_1.default)("getpatchinfo", timestamp);
    const patchNotesUrl = `${apiUrl}/getpatchinfojson/${devId}/${signature}/${session_1.session}/${timestamp}`;
    const patchNoteResp = yield (0, node_fetch_1.default)(patchNotesUrl);
    const data = yield patchNoteResp.json();
    return data.version_string;
});
exports.default = patchnoteFetch;
//# sourceMappingURL=patchnotesFetch.js.map