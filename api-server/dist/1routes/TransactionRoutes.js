"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TransactionController_1 = require("../2controllers/TransactionController");
const ValidTokenHandler_1 = __importDefault(require("../middleware/ValidTokenHandler"));
const router = express_1.default.Router();
router.use(ValidTokenHandler_1.default);
router.route("/").get(TransactionController_1.getTrans).post(TransactionController_1.createTrans);
router.route("/summary").get(TransactionController_1.getSummary);
router.route("/:id").get(TransactionController_1.getTransId).put(TransactionController_1.updateTrans).delete(TransactionController_1.deleteTrans);
// router.route("/").get(getTrans);
// router.route("/").post(createTrans);
// router.route("/summary").get(getSummary)
// router.route("/:id").get(getTransId);
// router.route("/:id").put(updateTrans);
// router.route("/:id").delete(deleteTrans);
exports.default = router;
