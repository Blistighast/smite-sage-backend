"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
require("dotenv/config");
const createSignature = (method, timeStamp) => {
    const devId = process.env.devId;
    const authKey = process.env.authKey;
    const unhashed = `${devId}${method}${authKey}${timeStamp}`;
    const signature = (0, crypto_1.createHash)("MD5").update(unhashed).digest("hex");
    return signature;
};
exports.default = createSignature;
//# sourceMappingURL=createSignature.js.map