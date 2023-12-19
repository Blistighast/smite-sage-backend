"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const Api_1 = __importDefault(require("./routes/Api"));
const SmiteApi_1 = __importDefault(require("./routes/SmiteApi"));
const Gods_1 = __importDefault(require("./routes/Gods"));
const Items_1 = __importDefault(require("./routes/Items"));
const Player_1 = __importDefault(require("./routes/Player"));
const Article_1 = __importDefault(require("./routes/Article"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const databaseUrl = process.env.dataBaseUrl;
app.listen(port, () => console.log(`listening on port ${port}`));
app.use((0, cors_1.default)({
    origin: [process.env.frontendUrl || "http://localhost:3000"],
    optionsSuccessStatus: 200,
}));
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(databaseUrl);
app.get("/", (_req, res) => {
    try {
        res.send("Smite Sage API");
    }
    catch (err) {
        console.error(err);
    }
});
app.use("/api", Api_1.default);
app.use("/smiteapi", SmiteApi_1.default);
app.use("/gods", Gods_1.default);
app.use("/items", Items_1.default);
app.use("/player", Player_1.default);
app.use("/article", Article_1.default);
//# sourceMappingURL=index.js.map