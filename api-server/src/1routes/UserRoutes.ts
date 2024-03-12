

import express,{ Express } from "express";
const router=express.Router();
import validateToken from "../middleware/ValidTokenHandler";

import { getLogin,getRegister,getCurrent } from "../2controllers/UserController";

router.post("/register",getRegister);

router.post("/login",getLogin);

router.get("/current",validateToken,getCurrent);

export default router;
