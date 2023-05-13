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
const godFetch_1 = __importDefault(require("../api/godFetch"));
const itemFetch_1 = __importDefault(require("../api/itemFetch"));
const patchnotesFetch_1 = __importDefault(require("../api/patchnotesFetch"));
const createSession_1 = __importDefault(require("../utils/createSession"));
const patchUpdater = (currentPatch) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("checking for version number change");
    yield (0, createSession_1.default)();
    const newPatch = yield (0, patchnotesFetch_1.default)();
    console.log("current patch-", currentPatch, "updated patch-", newPatch);
    if (newPatch !== currentPatch) {
        yield (0, godFetch_1.default)();
        yield (0, itemFetch_1.default)();
    }
    return newPatch;
});
exports.default = patchUpdater;
//# sourceMappingURL=patchUpdater.js.map