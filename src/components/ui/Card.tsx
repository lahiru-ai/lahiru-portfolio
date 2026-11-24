import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'subtle' | 'plain';
  hoverEffect?: boolean;
}

export function Card({
  className,
  variant = 'glass',
  hoverEffect = true,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    glass: 'glass-card',
    subtle: 'glass-panel-subtle rounded-3xl p-6 sm:p-8',
    plain: 'bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6',
  };

  return (
    <div
      className={cn(
        variantStyles[variant],
        hoverEffect && 'transition-all duration-300 hover:border-zinc-700/80',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
