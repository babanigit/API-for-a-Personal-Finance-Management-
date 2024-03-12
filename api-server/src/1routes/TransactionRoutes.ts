
import express,{ Express } from "express";
const router=express.Router();

import {
    getTrans,
    getTransId,
    deleteTrans,
    updateTrans,
    createTrans,
}from "../2controllers/TransactionController"
import validateToken from "../middleware/ValidTokenHandler";

router.use(validateToken);

router.route("/").get(getTrans);

router.route("/").post(createTrans);

router.route("/:id").get(getTransId);

router.route("/:id").put(updateTrans);

router.route("/:id").delete(deleteTrans);


export default router;

