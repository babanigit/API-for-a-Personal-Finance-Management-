"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    TransactionName: {
        type: String,
        required: [true, "please add the Transaction name"],
    },
    income: {
        type: Number,
        required: [true, "please add the income number"],
    },
    expenses: {
        type: Number,
        required: [true, "please add the expenses number"],
    },
}, {
    timestamps: true,
});
const mongo = mongoose_1.default.model("DataTrans", transSchema);
exports.default = mongo;
