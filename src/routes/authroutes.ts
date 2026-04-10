import {Router} from "express"
import {signUp,signIn} from "../controllers/authcontroller"
import express from "express"



const router =Router()

router.post("/signup",signUp)
router.post("/signin",signIn)


export default router