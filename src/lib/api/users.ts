import axios from 'axios';

const host = window.location.hostname;
export const API_URL = `http://${host}:5001/api`;

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export const usersApi = {
  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await axios.post(`${API_URL}/users`, data);
    return response.data;
  },

  async getUsers(): Promise<User[]> {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  async getUser(id: string): Promise<User> {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  }
}; 