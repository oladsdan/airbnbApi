import express from 'express';
import { likeListing } from '../controllers/userControlleres.js';
import authMiddleware from '../middlewares/Authmiddleware.js';

const router = express.Router();


router.put('/favorite/:id', authMiddleware, likeListing)


export default router