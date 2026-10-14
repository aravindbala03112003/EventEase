'use client';

import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  hover = false,
  onClick,
}: CardProps) {
  const hoverClass = hover ? 'card-hover' : 'card';
  return (
    <div className={`${hoverClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function CardHeader({
  title,
  description,
  children,
  className = '',
}: CardHeaderProps) {
  return (
    <div className={`p-6 border-b border-slate-200 ${className}`}>
      {title && <h3 className='text-lg font-bold text-slate-900'>{title}</h3>}
      {description && (
        <p className='mt-1 text-sm text-slate-600'>{description}</p>
      )}
      {children}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 ${className}`}>
      {children}
    </div>
  );
}
