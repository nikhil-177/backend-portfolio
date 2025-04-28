import express from 'express';
import {
  getUserCreatedRecipes,
  postUsersComment,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/createdRecipes', getUserCreatedRecipes);
router.post('/comments/post', postUsersComment);

export const userRoutes = router;
