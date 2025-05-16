"use client";

const USER_NAME_KEY = 'ManipuRuhi_user_name';

// Get user name from localStorage
export const getUserName = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem(USER_NAME_KEY);
  } catch (error) {
    console.error('Error retrieving user name:', error);
    return null;
  }
};

// Save user name to localStorage
export const saveUserName = (name: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(USER_NAME_KEY, name);
  } catch (error) {
    console.error('Error saving user name:', error);
  }
};

// Check if user name exists
export const hasUserName = (): boolean => {
  return !!getUserName();
}; 