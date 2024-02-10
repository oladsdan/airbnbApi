import express from 'express';
import authMiddleware from '../middlewares/Authmiddleware.js';
import { CreateListing, GetAllListing, GetListingbyId } from '../controllers/listingControllers.js';

const router = express.Router();


router.get('/allListings', GetAllListing)
router.get('/listing/:id', GetListingbyId)
router.post('/create', authMiddleware, CreateListing)


export default router