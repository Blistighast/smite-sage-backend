"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const serverPing = () => {
    console.log("I got a server ping!");
    const timeStamp = luxon_1.DateTime.utc().toFormat("yyyyMMddHHmmss");
    return { message: "backend up and running", timeStamp };
};
exports.default = serverPing;
//# sourceMappingURL=serverPing.js.map