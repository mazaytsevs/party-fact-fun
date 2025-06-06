import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export interface Fact {
  id: string;
  userId: string;
  fact: string;
  ai_fact: string | null;
  ai_title: string | null;
  ai_pic: string | null;
}

export interface CreateFactRequest {
  userId: string;
  fact: string;
  ai_fact: string;
  ai_title: string;
  ai_pic: string;
}

export const factsApi = {
  async createFact(data: CreateFactRequest): Promise<Fact> {
    const response = await axios.post(`${API_URL}/facts`, data);
    return response.data;
  },

  async getFacts(): Promise<Fact[]> {
    const response = await axios.get(`${API_URL}/facts`);
    return response.data;
  },

  async getFact(id: string): Promise<Fact> {
    const response = await axios.get(`${API_URL}/facts/${id}`);
    return response.data;
  }
}; 