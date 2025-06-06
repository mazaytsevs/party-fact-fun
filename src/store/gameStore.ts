
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
  login: (name: string) => User;
  logout: () => void;
  addFact: (fact: string) => void;
  submitAnswer: (factId: string, guessUserId: string) => boolean;
  getLeaderboard: () => User[];
}

export const useGameStore = create<GameState>((set, get) => ({
  users: [],
  facts: [],
  activeUser: null,
  answers: [],

  login: (name: string) => {
    const state = get();
    let user = state.users.find(u => u.name === name);
    
    if (!user) {
      user = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        score: 0
      };
      set({ users: [...state.users, user] });
    }
    
    set({ activeUser: user });
    return user;
  },

  logout: () => {
    set({ activeUser: null });
  },

  addFact: (factText: string) => {
    const state = get();
    if (!state.activeUser) return;

    const fact: Fact = {
      id: `fact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: state.activeUser.id,
      fact: factText,
      ai_fact: null,
      ai_title: null,
      ai_pic: null
    };

    set({ facts: [...state.facts, fact] });
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
  }
}));
