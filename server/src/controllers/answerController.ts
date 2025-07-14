import { Request, Response } from 'express';
import {pool} from "../index";

export const answerController = {
  async submitAnswer(req: Request, res: Response) {
    console.log('hey')
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
      console.log(error)
      res.status(500).json({ error: 'Failed to submit answer' });
    }
  },

  async getAnswers(req: Request, res: Response) {
    try {
      const result = await pool.query(
        `SELECT users.id AS user_id, users.name, COUNT(*) AS score
         FROM answers
         JOIN users ON answers.user_id = users.id
         WHERE answers.correct = true
         GROUP BY users.id, users.name
         ORDER BY score DESC`
      );
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get answers' });
    }
  }
};