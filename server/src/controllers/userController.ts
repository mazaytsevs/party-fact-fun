import { Request, Response } from 'express';
import { pool } from '../index';

const API_URL = 'http://localhost:5001/api';

export const userController = {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE name = $1',
        [name]
      );
      if (existingUser.rows.length > 0) {
        return res.json(existingUser.rows[0]);
      }
      const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email',
        [name, email]
      );
      res.json(result.rows[0]);
    } catch (error) {
        console.log('error', error);
      return res.status(500).json({ error: 'Failed to create user' });
    }
  },

  async getUsers(req: Request, res: Response) {
    try {
      const result = await pool.query('SELECT id, name, email FROM users');
      return res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get users' });
    }
  },

  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Здесь будет ваша логика работы с базой данных
      // Пока возвращаем заглушку
      res.json({
        id,
        name: 'Sample User',
        email: 'sample@example.com'
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get user' });
    }
  }
}; 