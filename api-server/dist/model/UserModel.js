"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "please add the username"],
    },
    email: {
        type: String,
        required: [true, "please add the email"],
        unique: [true, "email address already taken"],
    },
    password: {
        type: String,
        required: [true, "please add the password"],
    },
}, {
    timestamps: true,
});
const mongo = mongoose_1.default.model("DataUser", userSchema);
exports.default = mongo;
