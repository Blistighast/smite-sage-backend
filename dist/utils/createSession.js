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
const createSignature_1 = __importDefault(require("./createSignature"));
require("dotenv/config");
const session_1 = require("../api/session");
const apiUrl = process.env.apiUrl;
const createSession = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!session_1.session) {
        console.log("no session, creating session");
        const devId = process.env.devId;
        const timeStamp = luxon_1.DateTime.utc().toFormat("yyyyMMddHHmmss");
        const signature = (0, createSignature_1.default)("createsession", timeStamp);
        const createSessionUrl = `${apiUrl}/createsessionjson/${devId}/${signature}/${timeStamp}`;
        const smiteSessionCreateResp = yield (0, node_fetch_1.default)(createSessionUrl);
        const sessionData = yield smiteSessionCreateResp.json();
        (0, session_1.sessionTimeouter)();
        (0, session_1.sessionUpdater)(sessionData.session_id);
    }
    console.log("session", session_1.session);
    return;
});
exports.default = createSession;
//# sourceMappingURL=createSession.js.map