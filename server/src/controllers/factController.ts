import {giga, pool} from '../index';
import { Request, Response } from 'express';

const systemMessage = {
  role: "system",
  content: `Ты — трансформатор высказываний. Когда пользователь пишет фразу из повседневной жизни, ты переиначиваешь её художественно и стилизуешь под один из жанров: боевик, фэнтези, фантастика, триллер или турецкий сериал (жанр выбирай случайно).
Никогда не используй оригинальные имена, названия или прямые отсылки. Всегда меняй их на звучные, атмосферные, стилизованные под жанр.
Переделывай фразу так, чтобы суть и структура были узнаваемы, но переданы метафорически или аллегорически.
Примеры трансформации:
- Пользователь: “У меня есть две собаки — Деля и Ада.”
- Ответ: “Я странствующий воин, за спиной которого всегда два тени — безмолвные, быстрые, верные. Их зовут Дунтар и Эллиа.”
- Пользователь: “Я люблю пить чай по утрам.”
- Ответ: “С первыми лучами над Цитаделью я совершаю ритуал — горький настой из листьев приносит ясность разума перед очередным днём сражений.”
Всегда пиши в художественном стиле — как будто это отрывок из сценария, романа или дневника героя.
Нельзя использовать стиль чата или обычной речи. Никаких объяснений или мета-комментариев. Только художественный пересказ.`,
};

const systemMessageForTitle = {
  role: "system",
  content: `В ответ пришли заголовок для истории, что тебе отправит пользователь`,
};

export const factController = {
  async addFact(req: Request, res: Response) {
    const { userId, fact } = req.body;

    let aiFact = ""
    try {
      const messages = [systemMessage, {
        role: "user",
        content: fact,
      }]
      const response = await giga.chat({ messages });
      if (response.choices[0]?.message.content) aiFact = response.choices[0]?.message.content
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Failed to add fact' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO facts (user_id, fact, ai_fact, ai_title, ai_image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, fact, aiFact, null, null]
      );
      return res.json(result.rows[0]);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Failed to add fact' });
    }
  },

  async getFacts(req: Request, res: Response) {
    console.log('я тут!')
    try {
      const result = await pool.query('SELECT * FROM facts');
      return res.json(result.rows);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to get facts' });
    }
  },

  async getFact(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await pool.query(`SELECT * FROM facts WHERE id = ${id}`);
      return res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get fact' });
    }
  }
};