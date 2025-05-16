"use client";

import React from 'react';
import { FiPlus, FiTrash2, FiMessageSquare, FiZap } from 'react-icons/fi';
import { useChat } from '../context/ChatContext';

const Sidebar: React.FC = () => {
  const { chats, activeChat, createNewChat, setActiveChat, deleteChat, clearChats } = useChat();

  return (
    <div className="w-64 h-full bg-background/80 backdrop-blur-md no-border flex flex-col">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-purple to-secondary flex items-center justify-center shadow-glow">
            <FiZap className="text-white" size={20} />
          </div>
          <h1 className="font-bold text-2xl gradient-text">
            Manipuruhi
          </h1>
        </div>
        
        <button
          onClick={createNewChat}
          className="w-full flex items-center justify-center gap-2 bg-background-light hover:bg-background-light/80 text-primary py-2.5 px-4 rounded-xl transition-all neo-button"
        >
          <FiPlus size={18} />
          <span>New Chat</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3">
        <div className="px-2 py-1 text-xs font-semibold text-foreground/60 uppercase tracking-wider">
          Conversations
        </div>
        
        <div className="space-y-1.5 py-2">
          {chats.length === 0 ? (
            <div className="text-center text-sm text-foreground/50 py-4">
              No conversations yet
            </div>
          ) : (
            chats.map((chat, index) => (
              <div
                key={chat.id}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer group transition-all ${
                  activeChat?.id === chat.id
                    ? 'bg-gradient-to-r from-background-light to-background-light/70 shadow-glow'
                    : 'hover:bg-background-light/50'
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="flex items-center gap-3 truncate">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeChat?.id === chat.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-background-light text-foreground/60'
                    }`}
                  >
                    <FiMessageSquare size={14} />
                  </div>
                  <span className="truncate text-sm">{chat.title || 'New Chat'}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-foreground/50 hover:text-secondary transition-opacity p-1.5 rounded-full hover:bg-background-light"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="p-4 mt-auto">
        {chats.length > 0 && (
          <button
            onClick={clearChats}
            className="w-full flex items-center justify-center gap-2 bg-background-light hover:bg-background-light/80 text-secondary py-2 px-4 rounded-xl transition-all neo-button"
          >
            <FiTrash2 size={14} />
            <span>Clear all chats</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 