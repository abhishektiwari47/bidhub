"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const auth_1 = __importDefault(require("./routes/auth"));
const activities_1 = __importDefault(require("./routes/activities"));
const createCheckoutSession_1 = __importDefault(require("./payment/createCheckoutSession"));
const webhook_1 = __importDefault(require("./payment/webhook"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./constants");
app.use((0, cors_1.default)());
app.use("/auth", express_1.default.json(), auth_1.default);
app.use("/todo", express_1.default.json(), activities_1.default);
app.use("/pay", express_1.default.json(), createCheckoutSession_1.default);
app.use("/event", webhook_1.default);
app.listen(constants_1.port, () => {
    console.log(`Example app listening at http://localhost:${constants_1.port}`);
});
mongoose_1.default.connect(constants_1.connectionString, { dbName: "bidhub" }).then(() => {
    console.log("Connected to The database");
});
