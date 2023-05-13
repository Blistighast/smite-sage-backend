"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionTimeouter = exports.sessionUpdater = exports.session = void 0;
let session = null;
exports.session = session;
const sessionUpdater = (updatedSession) => {
    exports.session = session = updatedSession;
};
exports.sessionUpdater = sessionUpdater;
const sessionTimeouter = () => {
    console.log("setting session timeout");
    setTimeout(() => {
        console.log("nulling session");
        exports.session = session = null;
    }, 1000 * 60 * 14);
};
exports.sessionTimeouter = sessionTimeouter;
//# sourceMappingURL=session.js.map