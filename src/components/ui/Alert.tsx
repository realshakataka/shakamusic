import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  className?: string;
}

const alertStyles: Record<AlertType, { bg: string; text: string; Icon: typeof CheckCircle }> = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600',
    Icon: CheckCircle
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600',
    Icon: AlertCircle
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    text: 'text-yellow-600',
    Icon: AlertTriangle
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600',
    Icon: Info
  }
};

export const Alert: React.FC<AlertProps> = ({ type, message, className = '' }) => {
  const { bg, text, Icon } = alertStyles[type];

  return (
    <div className={`p-4 rounded-lg flex items-center gap-3 ${bg} ${text} ${className}`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
};