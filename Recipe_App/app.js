import express from 'express';
import { authRoutes } from './routes/auth.routes.js';

const app = express();

// middlewares
app.use(express.json())

// authRoutes
app.use('/api/v1/auth', authRoutes);

export default app;
