import express,{ Express } from "express";

import {
    getTrans,
    getTransId,
    deleteTrans,
    updateTrans,
    createTrans,
    getSummary,
}from "../2controllers/TransactionController"
import validateToken from "../middleware/ValidTokenHandler";

const router=express.Router();

router.use(validateToken);

router.route("/").get(getTrans).post(createTrans);
router.route("/summary").get(getSummary);
router.route("/:id").get(getTransId).put(updateTrans).delete(deleteTrans);

// router.route("/").get(getTrans);
// router.route("/").post(createTrans);
// router.route("/summary").get(getSummary)
// router.route("/:id").get(getTransId);
// router.route("/:id").put(updateTrans);
// router.route("/:id").delete(deleteTrans);

export default router;

