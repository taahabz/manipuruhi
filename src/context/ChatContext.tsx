"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Chat, ChatState, Message } from '../types/chat';
import { getChatsFromStorage, saveChatsToStorage, getActiveChatId, setActiveChatId } from '../utils/localStorage';
import { sendMessageToGemini } from '../utils/gemini';

interface ChatContextProps {
  chats: Chat[];
  activeChat: Chat | null;
  isLoading: boolean;
  createNewChat: () => string;
  setActiveChat: (chatId: string) => void;
  sendMessage: (content: string) => Promise<void>;
  deleteChat: (chatId: string) => void;
  clearChats: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ChatState>({
    chats: [],
    activeChat: null,
    isLoading: false,
  });

  // Load chats from localStorage on initial render
  useEffect(() => {
    const loadChats = () => {
      const chats = getChatsFromStorage();
      const activeChatId = getActiveChatId();
      
      setState(prevState => ({
        ...prevState,
        chats,
        activeChat: activeChatId,
      }));
    };
    
    loadChats();
  }, []);

  // Get the active chat object
  const getActiveChat = (): Chat | null => {
    if (!state.activeChat) return null;
    return state.chats.find(chat => chat.id === state.activeChat) || null;
  };

  // Create a new chat
  const createNewChat = (): string => {
    const newChatId = uuidv4();
    const timestamp = Date.now();
    
    const newChat: Chat = {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    
    const updatedChats = [...state.chats, newChat];
    
    setState(prevState => ({
      ...prevState,
      chats: updatedChats,
      activeChat: newChatId,
    }));
    
    saveChatsToStorage(updatedChats);
    setActiveChatId(newChatId);
    
    return newChatId;
  };

  // Set the active chat
  const setActiveChat = (chatId: string) => {
    setState(prevState => ({
      ...prevState,
      activeChat: chatId,
    }));
    
    setActiveChatId(chatId);
  };

  // Send a message to the active chat
  const sendMessage = async (content: string) => {
    // Create a new chat if there's no active chat
    let chatId = state.activeChat;
    let currentChat = getActiveChat();
    
    if (!chatId || !currentChat) {
      console.log("No active chat, creating a new one");
      chatId = createNewChat();
      
      // Ensure we have the newly created chat
      const chats = getChatsFromStorage();
      currentChat = chats.find(chat => chat.id === chatId) || {
        id: chatId,
        title: 'New Chat',
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      // Make sure the active chat is set
      setActiveChat(chatId);
    }
    
    if (!currentChat) {
      console.error("Failed to get or create active chat");
      return;
    }
    
    console.log("Sending message in chat:", chatId);
    
    // Create user message
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    
    // Add user message to chat
    const updatedMessages = [...currentChat.messages, userMessage];
    const updatedChat = {
      ...currentChat,
      messages: updatedMessages,
      updatedAt: Date.now(),
      title: updatedMessages.length === 1 ? content.substring(0, 30) : currentChat.title,
    };
    
    // Update state with user message
    const updatedChats = state.chats.map(chat => 
      chat.id === chatId ? updatedChat : chat
    );
    
    setState(prevState => ({
      ...prevState,
      chats: updatedChats,
      activeChat: chatId,
      isLoading: true,
    }));
    
    saveChatsToStorage(updatedChats);
    
    try {
      // Get response from Gemini API
      console.log("Getting response from Gemini for messages:", updatedMessages.length);
      const response = await sendMessageToGemini(updatedMessages);
      
      // Create assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      
      // Add assistant message to chat
      const finalMessages = [...updatedMessages, assistantMessage];
      const finalChat = {
        ...updatedChat,
        messages: finalMessages,
        updatedAt: Date.now(),
      };
      
      // Update state with assistant message
      const finalChats = state.chats.map(chat => 
        chat.id === chatId ? finalChat : chat
      );
      
      setState(prevState => ({
        ...prevState,
        chats: finalChats,
        isLoading: false,
      }));
      
      saveChatsToStorage(finalChats);
    } catch (error) {
      console.error('Error sending message:', error);
      
      setState(prevState => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  // Delete a chat
  const deleteChat = (chatId: string) => {
    const updatedChats = state.chats.filter(chat => chat.id !== chatId);
    
    setState(prevState => ({
      ...prevState,
      chats: updatedChats,
      activeChat: state.activeChat === chatId ? null : state.activeChat,
    }));
    
    saveChatsToStorage(updatedChats);
    
    if (state.activeChat === chatId) {
      setActiveChatId(null);
    }
  };

  // Clear all chats
  const clearChats = () => {
    setState(prevState => ({
      ...prevState,
      chats: [],
      activeChat: null,
    }));
    
    saveChatsToStorage([]);
    setActiveChatId(null);
  };

  return (
    <ChatContext.Provider
      value={{
        chats: state.chats,
        activeChat: getActiveChat(),
        isLoading: state.isLoading,
        createNewChat,
        setActiveChat,
        sendMessage,
        deleteChat,
        clearChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}; 