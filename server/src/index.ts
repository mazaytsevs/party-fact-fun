import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import GigaChat from "gigachat";

import userRoutes from './routes/userRoutes';
import factRoutes from './routes/factRoutes';
import answerRoutes from './routes/answerRoutes';

dotenv.config();

import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then((client) => {
    console.log('📦 Connected to PostgreSQL successfully');
    client.release();
  })


export const giga = new GigaChat({
    credentials: process.env.GIGA_CHAT_ACCESS_KEY,
});

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/facts', factRoutes);
app.use('/api/answers', answerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});