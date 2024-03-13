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
exports.getCurrent = exports.getLogin = exports.getRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
// @desc register a user
// @routes POST /user/register
// @access public
const getRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = yield req.body;
        if (!username || !email || !password) {
            res.status(400).json({ message: "all filed required" });
        }
        else {
            const userAvailable = yield UserModel_1.default.findOne({ email });
            if (userAvailable) {
                res
                    .status(400)
                    .json({ message: `user ${email} is already registered  ` });
            }
            else {
                // create hashedPassword
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // create user
                const user = yield UserModel_1.default.create({
                    username,
                    email,
                    password: hashedPassword,
                });
                console.log(`user created ${user} `);
                if (user) {
                    res.status(201).json({
                        message: "user created",
                        _id: user.id,
                        email: user.email
                    });
                }
                else {
                    res.status(400).json({ message: "user data invalid" });
                }
            }
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.getRegister = getRegister;
// @desc login a user
// @routes POST /user/login
// @access public
const getLogin = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = yield req.body;
        if (!email || !password) {
            res.status(400).json({ message: "all field required" });
        }
        else {
            const user = yield UserModel_1.default.findOne({ email });
            // compare with the both hashed password
            if (user && (yield bcrypt_1.default.compare(password, user.password))) {
                // generate Token
                const accessToken = jsonwebtoken_1.default.sign({
                    // this is your jwt payload
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                    },
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
                res.status(200).json({
                    message: "user Logged in",
                    token: accessToken
                });
            }
            else {
                res.status(401).json({ message: "email or password is invalid" });
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.getLogin = getLogin;
// @desc get current user
// @routes GET /api/user/current
// @access private
const getCurrent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.user);
});
exports.getCurrent = getCurrent;
