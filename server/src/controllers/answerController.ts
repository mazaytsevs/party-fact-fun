import { Request, Response } from 'express';
import {pool} from "../index";

export const answerController = {
  async submitAnswer(req: Request, res: Response) {
    try {
      const { userId, factId, guessUserId } = req.body;

      const result = await pool.query(
        `SELECT * FROM facts WHERE id = $1 AND user_id = $2`,
        [factId, guessUserId]
      );

      const isCorrect = result.rows.length > 0;

      await pool.query(
        `INSERT INTO answers (user_id, fact_id, correct) VALUES ($1, $2, $3)`,
        [userId, factId, isCorrect]
      );

      return res.json({ userId, factId, isCorrect });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit answer' });
    }
  },

  async getAnswers(req: Request, res: Response) {
    try {
      // Здесь будет ваша логика работы с базой данных
      // Пока возвращаем пустой массив
      res.json([]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get answers' });
    }
  }
}; 