"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../types/chat';
import { FiUser } from 'react-icons/fi';
import { RiRobot2Fill } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getUserName } from '../utils/userSettings';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const userName = getUserName() || 'You';
  
  return (
    <motion.div 
      className={`py-4 ${isUser ? '' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <motion.div 
            className="flex-shrink-0 mt-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1
            }}
          >
            <motion.div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isUser 
                  ? 'bg-gradient-to-br from-primary to-purple text-white shadow-glow' 
                  : 'bg-gradient-to-br from-secondary to-purple text-white shadow-glow'
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {isUser ? <FiUser size={14} /> : <RiRobot2Fill size={14} />}
            </motion.div>
          </motion.div>
          
          <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
            <motion.div 
              className="font-medium text-xs mb-1 text-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isUser ? userName : 'ManiRuruhi'}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.1
              }}
            >
              <div className={`inline-block backdrop-blur-sm ${isUser ? 'chat-bubble chat-bubble-user' : 'chat-bubble chat-bubble-ai'}`}>
                {isUser ? (
                  <div className="text-sm sm:text-base whitespace-pre-wrap text-foreground">
                    {message.content}
                  </div>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="text-sm sm:text-base whitespace-pre-wrap text-foreground"
                    components={{
                      strong: ({ node, ...props }) => <span className="font-bold text-primary" {...props} />,
                      em: ({ node, ...props }) => <span className="italic text-purple" {...props} />,
                      h1: ({ node, ...props }) => <h1 className="text-xl font-bold mt-4 mb-2 gradient-text" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-lg font-bold mt-3 mb-2 text-primary" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-base font-bold mt-3 mb-1 text-purple" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc ml-5 my-2 text-foreground/90" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal ml-5 my-2 text-foreground/90" {...props} />,
                      li: ({ node, ...props }) => <li className="my-1" {...props} />,
                      p: ({ node, ...props }) => <p className="my-2" {...props} />,
                      code: ({ node, ...props }: any) => {
                        const isInline = props.inline || false;
                        return isInline ? (
                          <code className="bg-background px-1 py-0.5 rounded text-secondary" {...props} />
                        ) : (
                          <code className="block bg-background p-2 rounded my-2 overflow-x-auto text-green" {...props} />
                        );
                      }
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage; 