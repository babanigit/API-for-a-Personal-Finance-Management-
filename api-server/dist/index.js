"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const DbConnection_1 = __importDefault(require("./connection/DbConnection"));
const UserRoutes_1 = __importDefault(require("./1routes/UserRoutes"));
const TransactionRoutes_1 = __importDefault(require("./1routes/TransactionRoutes"));
dotenv_1.default.config({ path: "./.env" });
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, DbConnection_1.default)();
// Routes
app.use("/api/transaction", TransactionRoutes_1.default);
app.use("/api/user", UserRoutes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Finance Management API is live"
    });
});
app.listen(port, () => {
    console.log(`[server]: hello, my Server is running at http://localhost:${port}`);
});
