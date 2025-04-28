import express from 'express';
import { createRecipe } from '../controllers/recipe.controller.js';
import { isAdmin } from '../middlewares/adminAuth.middleware.js';

const router = express.Router();

router.post('/create', isAdmin, createRecipe);

export const recipeRoutes = router;
