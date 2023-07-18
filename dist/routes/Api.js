"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverPing_1 = __importDefault(require("../api/serverPing"));
const router = express_1.default.Router();
router.use((_req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET");
    next();
});
router.get("/", (_req, resp) => {
    try {
        resp.json((0, serverPing_1.default)());
    }
    catch (error) {
        console.log(error);
    }
});
router.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
router.get("/health", (_req, res) => {
    const data = {
        uptime: process.uptime(),
        message: "Ok",
        date: new Date(),
    };
    res.status(200).send(data);
});
exports.default = router;
//# sourceMappingURL=Api.js.map