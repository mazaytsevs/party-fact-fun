import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export interface Answer {
  userId: string;
  factId: string;
  isCorrect: boolean;
}

export interface SubmitAnswerRequest {
  userId: string;
  factId: string;
  guessUserId: string;
}

export const answersApi = {
  async submitAnswer(data: SubmitAnswerRequest): Promise<Answer> {
    const response = await axios.post(`${API_URL}/answers`, data);
    return response.data;
  },

  async getAnswers(): Promise<Answer[]> {
    const response = await axios.get(`${API_URL}/answers`);
    return response.data;
  }
}; 