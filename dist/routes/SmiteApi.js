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
const createSession_1 = __importDefault(require("../utils/createSession"));
const apiPing_1 = __importDefault(require("../api/apiPing"));
const sessionTest_1 = __importDefault(require("../api/sessionTest"));
const apiUsed_1 = __importDefault(require("../api/apiUsed"));
const patchnotesFetch_1 = __importDefault(require("../api/patchnotesFetch"));
const patchUpdater_1 = __importDefault(require("../db/patchUpdater"));
const session_1 = require("../api/session");
const router = express_1.default.Router();
router.get("/", (_req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        resp.json(yield (0, apiPing_1.default)());
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/createsession", (_req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, createSession_1.default)();
        resp.json(session_1.session);
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/testsession", (_req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        resp.json(yield (0, sessionTest_1.default)());
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/patchnotes", (_req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        resp.json(yield (0, patchnotesFetch_1.default)());
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/getuseddata", (_req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        resp.json(yield (0, apiUsed_1.default)());
    }
    catch (err) {
        console.error(err);
    }
}));
router.get("/devmanualupdate", (_req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPatch = yield (0, patchUpdater_1.default)();
        resp.json(newPatch);
    }
    catch (err) {
        console.error(err);
    }
}));
exports.default = router;
//# sourceMappingURL=SmiteApi.js.map