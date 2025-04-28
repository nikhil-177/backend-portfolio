import express from 'express';
import {
  getUserCommentsOnRecipes,
  getUserCreatedRecipes,
  postUsersComment,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/createdRecipes', getUserCreatedRecipes);
router.post('/comments/post', postUsersComment);
router.get('/comments', getUserCommentsOnRecipes);

export const userRoutes = router;
