import express from "express";
import { getUser, login, logout, requireAuth, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.get('/auth/logout', logout);
router.get('/auth/user', requireAuth, getUser);

export default router;