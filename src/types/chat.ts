export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface ChatState {
  chats: Chat[];
  activeChat: string | null;
  isLoading: boolean;
}

export interface ManipulationGuide {
  task: string;
  approach: string;
  psychologyTactics: string[];
  languagePatterns: string[];
  persuasionTechniques: string[];
} 