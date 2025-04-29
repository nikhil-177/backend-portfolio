import express from 'express';
import {
  addUsersFavouriteRecipe,
  getUserCommentsOnRecipes,
  getUserCreatedRecipes,
  getUsersFavouriteRecipes,
  postUsersComment,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/createdRecipes', getUserCreatedRecipes);
router.post('/comments/post', postUsersComment);
router.get('/comments', getUserCommentsOnRecipes);
router.patch('/favourites/:recipeId', addUsersFavouriteRecipe);
router.patch('/favourites/remove/:recipeId', removeUsersFavouriteRecipe);
router.get('/favourites', getUsersFavouriteRecipes);

export const userRoutes = router;
