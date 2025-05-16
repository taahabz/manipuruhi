"use client";

import { Chat, ChatState } from '../types/chat';

const STORAGE_KEY = 'ManipuRuhi_chat_data';

// Get all chats from localStorage
export const getChatsFromStorage = (): Chat[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return [];
    
    const parsedData = JSON.parse(storedData);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error('Error retrieving chats from localStorage:', error);
    return [];
  }
};

// Save all chats to localStorage
export const saveChatsToStorage = (chats: Chat[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error('Error saving chats to localStorage:', error);
  }
};

// Get a specific chat by ID
export const getChatById = (chatId: string): Chat | undefined => {
  const chats = getChatsFromStorage();
  return chats.find(chat => chat.id === chatId);
};

// Save a specific chat
export const saveChat = (chat: Chat): void => {
  const chats = getChatsFromStorage();
  const existingChatIndex = chats.findIndex(c => c.id === chat.id);
  
  if (existingChatIndex >= 0) {
    // Update existing chat
    chats[existingChatIndex] = chat;
  } else {
    // Add new chat
    chats.push(chat);
  }
  
  saveChatsToStorage(chats);
};

// Delete a chat by ID
export const deleteChat = (chatId: string): void => {
  const chats = getChatsFromStorage();
  const updatedChats = chats.filter(chat => chat.id !== chatId);
  saveChatsToStorage(updatedChats);
};

// Get the active chat ID
export const getActiveChatId = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem('active_chat_id');
  } catch (error) {
    console.error('Error retrieving active chat ID:', error);
    return null;
  }
};

// Set the active chat ID
export const setActiveChatId = (chatId: string | null): void => {
  if (typeof window === 'undefined') return;
  
  try {
    if (chatId) {
      localStorage.setItem('active_chat_id', chatId);
    } else {
      localStorage.removeItem('active_chat_id');
    }
  } catch (error) {
    console.error('Error saving active chat ID:', error);
  }
}; 