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
const godSchema_1 = __importDefault(require("../schema/godSchema"));
const recommendedItemsFetch_1 = __importDefault(require("../api/recommendedItemsFetch"));
const router = express_1.default.Router();
router.get("/", (_req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("grabbing gods list from db");
        const gods = yield godSchema_1.default.find().select("Name Pantheon Roles godCard_URL godIcon_URL id");
        resp.json(gods);
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/latestgod", (_req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const god = yield godSchema_1.default.find({ Name: "Ix Chel" });
        resp.json(god);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get("/godscount", (_req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const godCount = yield godSchema_1.default.where().countDocuments();
        resp.json(godCount);
    }
    catch (err) {
        console.error(err);
    }
}));
router.get("/recommendeditems/:godid", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recommendedItems = yield (0, recommendedItemsFetch_1.default)(req.params.godid);
        console.log(recommendedItems);
        resp.json(recommendedItems);
    }
    catch (err) {
        console.error(err);
    }
}));
router.get("/:name", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const godName = req.params.name;
        const god = yield godSchema_1.default.find({ Name: godName });
        resp.json(god);
    }
    catch (error) {
        console.error(error);
    }
}));
exports.default = router;
//# sourceMappingURL=Gods.js.map