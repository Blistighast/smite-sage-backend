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
const playerFetch_1 = __importDefault(require("../api/playerFetch"));
const router = express_1.default.Router();
router.get("/:playername", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield (0, playerFetch_1.default)(req.params.playername);
        resp.json(player);
    }
    catch (err) {
        console.error(err);
    }
}));
exports.default = router;
//# sourceMappingURL=Player.js.map