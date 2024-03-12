"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        const authHeader = req.headers.authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, decoded) => {
                if (err)
                    res.status(401).json({ message: "user is not authenticated" });
                else {
                    const decodedPayload = decoded;
                    req.user = decodedPayload.user; // Assign decoded payload to 'user' property
                    next();
                }
            });
            if (!token) {
                res.status(401).json({
                    message: "user is not authorized or the token is missing",
                });
            }
        }
        else {
            res.status(401).json({
                message: "user is not authorized or the token is missing",
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = validateToken;
