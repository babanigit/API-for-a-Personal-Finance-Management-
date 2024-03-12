"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const TransactionController_1 = require("../2controllers/TransactionController");
const ValidTokenHandler_1 = __importDefault(require("../middleware/ValidTokenHandler"));
router.use(ValidTokenHandler_1.default);
router.route("/").get(TransactionController_1.getTrans);
router.route("/").post(TransactionController_1.createTrans);
router.route("/:id").get(TransactionController_1.getTransId);
router.route("/:id").put(TransactionController_1.updateTrans);
router.route("/:id").delete(TransactionController_1.deleteTrans);
exports.default = router;
