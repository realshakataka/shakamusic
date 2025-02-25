import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`dark:bg-white/10 bg-black/5 backdrop-blur-lg rounded-xl ${className}`}>
      {children}
    </div>
  );
};