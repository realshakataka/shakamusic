import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-3 p-4 text-red-600 bg-red-100 dark:bg-red-900/20 rounded-lg">
      <AlertTriangle className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
};