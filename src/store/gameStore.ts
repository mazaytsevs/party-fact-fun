import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  score: number;
}

export interface Fact {
  id: string;
  userId: string;
  fact: string;
  ai_fact: string | null;
  ai_title: string | null;
  ai_pic: string | null;
}

export interface Answer {
  userId: string;
  factId: string;
  isCorrect: boolean;
}

interface GameState {
  users: User[];
  facts: Fact[];
  activeUser: User | null;
  answers: Answer[];

  // Actions
  login: (name: string, id?: string) => User;
  logout: () => void;
  addFact: (fact: string) => Promise<void>;
  submitAnswer: (factId: string, guessUserId: string) => boolean;
  getLeaderboard: () => User[];
  getActiveUsers: () => User[];
  loadUsers: () => Promise<void>;
  loadFacts: () => Promise<void>;
}

const host = window.location.hostname;
export const API_URL = `http://${host}:5001/api`;

export const useGameStore = create<GameState>((set, get) => ({
  users: [],
  facts: [],
  activeUser: typeof window !== 'undefined' && localStorage.getItem('activeUser')
    ? JSON.parse(localStorage.getItem('activeUser')!)
    : null,
  answers: [],

  login: (name: string, id?: string) => {
    const state = get();
    let user = state.users.find(u => u.name === name);

    if (!user) {
      user = {
        id: id || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        score: 0
      };
      set({ users: [...state.users, user] });
    }

    set({ activeUser: user });
    localStorage.setItem('activeUser', JSON.stringify(user));
    return user;
  },

  logout: () => {
    set({ activeUser: null });
    localStorage.removeItem('activeUser');
  },

  addFact: async (factText: string) => {
    const state = get();
    if (!state.activeUser) return;

    const res = await fetch(`${API_URL}/facts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: state.activeUser.id,
        fact: factText
      }),
    });

    if (!res.ok) {
      console.error('Failed to send fact to backend');
      return;
    }

    const newFact = await res.json();
    set({ facts: [...state.facts, newFact] });
  },

  submitAnswer: (factId: string, guessUserId: string) => {
    const state = get();
    if (!state.activeUser) return false;

    const fact = state.facts.find(f => f.id === factId);
    if (!fact) return false;

    const isCorrect = fact.userId === guessUserId;

    const answer: Answer = {
      userId: state.activeUser.id,
      factId,
      isCorrect
    };

    set({ answers: [...state.answers, answer] });

    if (isCorrect) {
      const updatedUsers = state.users.map(user =>
        user.id === state.activeUser!.id
          ? { ...user, score: user.score + 1 }
          : user
      );
      const updatedActiveUser = updatedUsers.find(u => u.id === state.activeUser!.id);
      set({ users: updatedUsers, activeUser: updatedActiveUser || state.activeUser });
    }

    return isCorrect;
  },

  getLeaderboard: () => {
    const state = get();
    return [...state.users].sort((a, b) => b.score - a.score);
  },
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
  getActiveUsers: async () => {
    const res = await fetch(`${API_URL}/users/all`);
    if (!res.ok) throw new Error('Failed to fetch active users');
    return await res.json();
  },
  loadUsers: async () => {
    const users = await get().getActiveUsers();
    set({ users });
  },
  loadFacts: async () => {
    const res = await fetch(`${API_URL}/facts`);
    if (!res.ok) throw new Error('Failed to fetch facts');
    const facts = await res.json();
    set({ facts });
  },
}));
