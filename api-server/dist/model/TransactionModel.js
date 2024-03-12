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
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "please add the contact email address"],
    },
    phone: {
        type: String,
        required: [true, "please add the contact phone number"],
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
const monog = mongoose_1.default.model("DataTrans", transSchema);
exports.default = monog;
