import express from 'express';
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
} from '../controllers/recipe.controller.js';
import { isAdmin } from '../middlewares/adminAuth.middleware.js';
import {
  getRecipesBasedOnStatus,
  updateRecipeStatus,
} from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/create', createRecipe);
router.put('/update/:id', updateRecipe);
router.delete('/delete/:id', deleteRecipe);
router.get('/', getAllRecipes);
router.get('/:id', getRecipe);

router.get('/admin/:status', isAdmin, getRecipesBasedOnStatus);
router.patch('/admin/:status', isAdmin, updateRecipeStatus);

export const recipeRoutes = router;
