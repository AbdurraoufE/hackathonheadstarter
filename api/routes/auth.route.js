import express from 'express';
import { register } from '../controllers/auth.controller.js';

const auth = express.Router();

router.post("/register", register);

router.post("/lgoin", login);

router.post("/logout", logout);