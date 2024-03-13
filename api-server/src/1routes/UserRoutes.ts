import express,{ Express } from "express";

import validateToken from "../middleware/ValidTokenHandler";
import { getLogin,getRegister,getCurrent } from "../2controllers/UserController";

const router=express.Router();

router.post("/register",getRegister);

router.post("/login",getLogin);

router.get("/current",validateToken,getCurrent);

export default router;
