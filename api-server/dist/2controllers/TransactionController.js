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
exports.createTrans = exports.updateTrans = exports.deleteTrans = exports.getTransId = exports.getTrans = void 0;
const TransactionModel_1 = __importDefault(require("../model/TransactionModel"));
// @desc get all trans
// @routes GET/api/trans
// @access private
const getTrans = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const contacts = await Contact.find({ user_id: req.user.id });
    // res.status(200).json(contacts);
}));
exports.getTrans = getTrans;
// @desc Create new  contacts
// @routes POST/api/contacts
// @access private
const createTrans = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customReq = req; // Type assertion
        const { name, email, phone } = yield req.body;
        if (!name || !email || !phone) {
            res.status(400).json({ message: "all filed required" });
            // res.status(400);
            // throw new Error({ message: "all field are mandatory" });
        }
        else {
            const contact = yield TransactionModel_1.default.create({
                name,
                email,
                phone,
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
// @desc get all contacts
// @routes GET/api/contacts/:id
// @access private
const getTransId = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const contact = await Contact.findById(req.params.id);
    // if (!contact) {
    //   res.status(404).json({ message: " contact not found" });
    // } else {
    //   res.status(200).json(contact);
    // }
}));
exports.getTransId = getTransId;
// @desc update contacts
// @routes PUT/api/contacts/:id
// @access private
const updateTrans = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const contact = await Contact.findById(req.params.id);
    // if (!contact) {
    //   res.status(404).json({ message: " contact not found" });
    // } else {
    //   if (contact.user_id.toSting() != req.user.id) {
    //     res
    //       .status(403)
    //       .json({
    //         message: "user dont have permission update other user contacts",
    //       });
    //   } else {
    //     const updateContact = await Contact.findByIdAndUpdate(
    //       req.params.id,
    //       req.body,
    //       { new: true }
    //     );
    //     res.status(200).json(updateContact);
    //   }
    // }
}));
exports.updateTrans = updateTrans;
// @desc delete contacts
// @routes DELETE/api/contacts/:id
// @access private
const deleteTrans = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   const contact = await Contact.findById(req.params.id);
        //   if (!contact) {
        //     res.status(404).json({ message: " contact not found" });
        //   } else {
        //     if (contact.user_id.toSting() != req.user.id) {
        //       res
        //         .status(403)
        //         .json({
        //           message: "user dont have permission update other user contacts",
        //         });
        //     } else {
        //       await Contact.deleteOne({ _id: req.params.id });
        //       res.status(200).json(contact);
        //     }
        //   }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.deleteTrans = deleteTrans;
