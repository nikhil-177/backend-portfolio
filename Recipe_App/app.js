import express from 'express';
import { authRoutes } from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// authRoutes
app.use('/api/v1/auth', authRoutes);

export default app;
