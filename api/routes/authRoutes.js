import { login, register } from "../controllers/authControllers.js";
import express from "express";

const router = express.Router();


router.post('/register', register)
router.post('/sign-in', login)



export default router