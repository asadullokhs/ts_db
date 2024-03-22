import express from "express";
import userCtrl from  "../controller/userCtrl";


const router = express.Router()

router.post("/register", userCtrl.signUp)
router.post("/login", userCtrl.login)


export default router;