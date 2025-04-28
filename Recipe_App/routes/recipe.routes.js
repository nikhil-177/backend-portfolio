import express from 'express';
import {
  createRecipe,
  deleteRecipe,
  updateRecipe,
} from '../controllers/recipe.controller.js';
import { isAdmin } from '../middlewares/adminAuth.middleware.js';

const router = express.Router();

router.post('/create', isAdmin, createRecipe);
router.put('/update/:id', isAdmin, updateRecipe);
router.delete('/delete/:id', isAdmin, deleteRecipe);

export const recipeRoutes = router;
