"use client";

import React, { useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { FiInfo, FiZap } from 'react-icons/fi';
import { getUserName } from '../utils/userSettings';

const ChatContainer: React.FC = () => {
  const { activeChat, sendMessage, createNewChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userName = getUserName() || 'You';

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    // Create a new chat first if none exists
    let chatId = activeChat?.id;
    if (!chatId) {
      chatId = createNewChat();
      // Give more time for the chat creation to complete
      setTimeout(() => {
        sendMessage(suggestion);
      }, 50);
    } else {
      sendMessage(suggestion);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {!activeChat || activeChat.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-4 text-center">
            <div className="max-w-md">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-purple flex items-center justify-center shadow-glow">
                  <FiZap className="text-white" size={32} />
                </div>
              </div>
              
              <h2 className="text-5xl font-bold gradient-text mb-2 pb-2">
                Hello, {userName}!
              </h2>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground/90">
                Welcome to the Manipulation Bitch
              </h3>
              
              <p className="text-foreground/70 mb-6">
              Tell me what you desire. I will make it yours, whatever it takes, whatever it breaks.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-2 justify-center">
                {['How to persuade someone?', 'Negotiation tactics', 'Sales techniques'].map((suggestion) => (
                  <button 
                    key={suggestion} 
                    className="px-3 py-2 rounded-full border border-border/50 text-foreground/70 hover:bg-background-light hover:text-primary hover:border-primary/30 transition-all text-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4">
            {activeChat.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <ChatInput />
    </div>
  );
};

export default ChatContainer; 