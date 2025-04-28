import express from 'express';
import { getUserCreatedRecipes } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/createdRecipes', getUserCreatedRecipes);

export const userRoutes = router;
