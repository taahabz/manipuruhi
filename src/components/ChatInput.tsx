"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiMic, FiPlus } from 'react-icons/fi';
import { useChat } from '../context/ChatContext';

const ChatInput: React.FC = () => {
  const { sendMessage, isLoading, activeChat, createNewChat } = useChat();
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Create a new chat first if none exists
    let chatId = activeChat?.id;
    const message = input.trim();
    setInput('');
    
    if (!chatId) {
      chatId = createNewChat();
      // Give more time for the chat creation to complete
      setTimeout(() => {
        sendMessage(message);
      }, 50);
    } else {
      sendMessage(message);
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Handle Ctrl+Enter or Cmd+Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-background no-border p-4 sm:p-5">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="glass-effect relative flex items-end shadow-md transition-all">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about manipulation techniques..."
            className="flex-1 py-3 pl-4 pr-24 bg-transparent resize-none outline-none max-h-[200px] text-sm sm:text-base text-foreground neo-input border-0 font-['Saira'] scrollbar-hide"
            rows={1}
            disabled={isLoading}
          />
          
          <div className="absolute right-2 bottom-2 flex gap-2">
 
            
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-full ${
                !input.trim() || isLoading
                  ? 'text-foreground/30 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary to-purple text-white hover:opacity-90 shadow-glow'
              } transition-all`}
              aria-label="Send message"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-center text-foreground/40">
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-pulse">Generating response</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
              <span className="animate-bounce delay-300">.</span>
            </span>
          ) : (
            <span>
              Press <kbd className="px-1 py-0.5 bg-background-light/70 rounded text-xs">Ctrl</kbd> + <kbd className="px-1 py-0.5 bg-background-light/70 rounded text-xs">Enter</kbd> to send
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatInput; 