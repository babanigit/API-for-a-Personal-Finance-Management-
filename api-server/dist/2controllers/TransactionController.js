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
exports.getSummary = exports.createTrans = exports.updateTrans = exports.deleteTrans = exports.getTransId = exports.getTrans = void 0;
const TransactionModel_1 = __importDefault(require("../model/TransactionModel"));
// @desc get all transaction with summary
// @routes GET /transaction/summary
// @access private
const getSummary = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req; // Type assertion 
        // it will find all the transaction with your user_id
        const data = yield TransactionModel_1.default.find({ user_id: customReq.user.id });
        // total income
        let totalIncome = 0;
        data.forEach((data) => {
            totalIncome = totalIncome + data.income;
        });
        // total expenses
        let totalExpenses = 0;
        data.forEach((data) => {
            totalExpenses = totalExpenses + data.expenses;
        });
        // total savings
        let totalSavings = totalIncome - totalExpenses;
        res.status(200).json({
            "total income": totalIncome,
            "total expenses": totalExpenses,
            "total Savings": totalSavings,
            "all Transactions": data,
        });
    }
    catch (error) {
        console.error(error);
    }
}));
exports.getSummary = getSummary;
// @desc get all transaction
// @routes GET /transaction
// @access private
const getTrans = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req; // Type assertion
        // it will find you all the user id's
        const data = yield TransactionModel_1.default.find({ user_id: customReq.user.id });
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
}));
exports.getTrans = getTrans;
// @desc Create new transaction
// @routes POST /transaction
// @access private
const createTrans = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req; // Type assertion
        const { TransactionName, income, expenses } = yield req.body;
        if (!TransactionName || !income || !expenses) {
            res.status(400).json({ message: "all filed required" });
            // res.status(400);
            // throw new Error({ message: "all field are mandatory" });
        }
        else {
            console.log(customReq.user);
            const data = yield TransactionModel_1.default.create({
                TransactionName,
                income,
                expenses,
                user_id: customReq.user.id,
            });
            res.status(201).json(data);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.createTrans = createTrans;
// @desc get transaction by id
// @routes GET /transaction/:id
// @access private
const getTransId = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req; // Type assertion
        const data = yield TransactionModel_1.default.findById(customReq.params.id);
        if (!data) {
            res.status(404).json({ message: " Transaction not found" });
        }
        else {
            res.status(200).json(data);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.getTransId = getTransId;
// @desc update transaction
// @routes PUT transaction/:id
// @access private
const updateTrans = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req; // Type assertion
        const data = yield TransactionModel_1.default.findById(req.params.id);
        if (!data) {
            res.status(404).json({ message: " transaction not found" });
        }
        else {
            if (data.user_id.toString() != customReq.user.id) {
                res
                    .status(403)
                    .json({
                    message: "user don't have permission update other user contacts",
                });
            }
            else {
                const updatedData = yield TransactionModel_1.default.findByIdAndUpdate(customReq.params.id, customReq.body, { new: true });
                res.status(200).json(updatedData);
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.updateTrans = updateTrans;
// @desc delete transaction
// @routes DELETE /transaction/:id
// @access private
const deleteTrans = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req; // Type assertion
        const data = yield TransactionModel_1.default.findById(req.params.id);
        if (!data) {
            res.status(404).json({ message: " Transaction not found" });
        }
        else {
            if (data.user_id.toString() != customReq.user.id) {
                res
                    .status(403)
                    .json({
                    message: "user don't have permission update other user contacts",
                });
            }
            else {
                yield TransactionModel_1.default.deleteOne({ _id: customReq.params.id });
                res.status(200).json(data);
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.deleteTrans = deleteTrans;
