import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface SectionHeadingProps {
  badgeText: string;
  badgeVariant?: 'blue' | 'purple' | 'emerald' | 'amber' | 'cyan' | 'zinc';
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  badgeText,
  badgeVariant = 'blue',
  icon,
  title,
  subtitle,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-2.5 mb-14',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      <Badge variant={badgeVariant} className="mb-1">
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{badgeText}</span>
      </Badge>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>

      {subtitle && (
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
