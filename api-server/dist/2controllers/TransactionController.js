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
const getSummary = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req; // Type assertion 
        // it will find all the transaction with your user_id
        const contacts = yield TransactionModel_1.default.find({ user_id: customReq.user.id });
        // total income
        let totalIncome = 0;
        contacts.forEach((contact) => {
            totalIncome = totalIncome + contact.income;
        });
        // total expenses
        let totalExpenses = 0;
        contacts.forEach((contact) => {
            totalExpenses = totalExpenses + contact.expenses;
        });
        // total savings
        let totalSavings = totalIncome - totalExpenses;
        res.status(200).json({
            "total income": totalIncome,
            "total expenses": totalExpenses,
            "total Savings": totalSavings,
            "all Transactions": contacts,
        });
        console.log("get transaction");
    }
    catch (error) {
        console.error(error);
    }
}));
exports.getSummary = getSummary;
// @desc get all trans
// @routes GET/api/trans
// @access private
const getTrans = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req; // Type assertion
        // it will find you all the user id's
        const contacts = yield TransactionModel_1.default.find({ user_id: customReq.user.id });
        res.status(200).json(contacts);
    }
    catch (error) {
        console.error(error);
    }
}));
exports.getTrans = getTrans;
// @desc Create new transaction
// @routes POST/api/trans
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
            const contact = yield TransactionModel_1.default.create({
                TransactionName,
                income,
                expenses,
                user_id: customReq.user.id,
            });
            res.status(201).json(contact);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.createTrans = createTrans;
// @desc get transaction by id
// @routes GET/api/trans/:id
// @access private
const getTransId = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req; // Type assertion
        const contact = yield TransactionModel_1.default.findById(customReq.params.id);
        if (!contact) {
            res.status(404).json({ message: " contact not found" });
        }
        else {
            res.status(200).json(contact);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.getTransId = getTransId;
// @desc update trans
// @routes PUT/api/trans/:id
// @access private
const updateTrans = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req; // Type assertion
        const contact = yield TransactionModel_1.default.findById(req.params.id);
        if (!contact) {
            res.status(404).json({ message: " contact not found" });
        }
        else {
            if (contact.user_id.toString() != customReq.user.id) {
                res
                    .status(403)
                    .json({
                    message: "user don't have permission update other user contacts",
                });
            }
            else {
                const updateContact = yield TransactionModel_1.default.findByIdAndUpdate(customReq.params.id, customReq.body, { new: true });
                res.status(200).json(updateContact);
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.updateTrans = updateTrans;
// @desc delete trans
// @routes DELETE/api/trans/:id
// @access private
const deleteTrans = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req; // Type assertion
        const contact = yield TransactionModel_1.default.findById(req.params.id);
        if (!contact) {
            res.status(404).json({ message: " contact not found" });
        }
        else {
            if (contact.user_id.toString() != customReq.user.id) {
                res
                    .status(403)
                    .json({
                    message: "user don't have permission update other user contacts",
                });
            }
            else {
                yield TransactionModel_1.default.deleteOne({ _id: customReq.params.id });
                res.status(200).json(contact);
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.deleteTrans = deleteTrans;
