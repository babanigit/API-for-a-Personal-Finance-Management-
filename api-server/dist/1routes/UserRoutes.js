"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ValidTokenHandler_1 = __importDefault(require("../middleware/ValidTokenHandler"));
const UserController_1 = require("../2controllers/UserController");
const router = express_1.default.Router();
router.post("/register", UserController_1.getRegister);
router.post("/login", UserController_1.getLogin);
router.get("/current", ValidTokenHandler_1.default, UserController_1.getCurrent);
exports.default = router;
