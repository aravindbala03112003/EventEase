'use client';

import React, { ReactNode, useState, useEffect } from 'react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const typeStyles: Record<string, { bg: string; border: string; icon: string }> = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: '✓',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: '✕',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: '⚠',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'ⓘ',
  },
};

export function Alert({
  type = 'info',
  title,
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  const styles = typeStyles[type];

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-4 flex items-start gap-3 animate-slide-in`}>
      <span className="text-xl flex-shrink-0">{styles.icon}</span>
      <div className="flex-1">
        {title && <h4 className="font-semibold text-slate-900">{title}</h4>}
        <p className="text-sm text-slate-700">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="text-slate-400 hover:text-slate-600 flex-shrink-0"
        >
          ✕
        </button>
      )}
    </div>
  );
}
