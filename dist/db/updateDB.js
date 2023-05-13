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
const godSchema_1 = __importDefault(require("../schema/godSchema"));
const updateDB = (patchVersion) => __awaiter(void 0, void 0, void 0, function* () {
    const godAmount = yield godSchema_1.default.where().countDocuments();
    const patchInfo = {
        version: patchVersion,
        newGod: null,
        patchNotesURL: null,
    };
    const newGodAmount = yield godSchema_1.default.where().countDocuments();
    newGodAmount > godAmount
        ? (patchInfo.newGod = "y")
        : (patchInfo.newGod = "n");
    console.log(patchInfo);
});
exports.default = updateDB;
//# sourceMappingURL=updateDB.js.map