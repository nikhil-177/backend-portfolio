import express from 'express';
import { authRoutes } from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import { profileRoutes } from './routes/profile.routes.js';

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// authRoutes
app.use('/api/v1/auth', authRoutes);
// profileRoutes
app.use('/api/v1/profile', profileRoutes);

export default app;
