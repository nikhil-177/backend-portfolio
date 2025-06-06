import express from 'express';
import { authRoutes } from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import { profileRoutes } from './routes/profile.routes.js';
import { authMiddleware } from './middlewares/auth.middleware.js';
import { recipeRoutes } from './routes/recipe.routes.js';
import { userRoutes } from './routes/user.routes.js';

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// authRoutes
app.use('/api/v1/auth', authRoutes);
// profileRoutes
app.use('/api/v1/profile', authMiddleware, profileRoutes);
// recipeRoutes
app.use('/api/v1/recipes', authMiddleware, recipeRoutes);
// userRoutes
app.use('/api/v1/users',authMiddleware, userRoutes);

export default app;
