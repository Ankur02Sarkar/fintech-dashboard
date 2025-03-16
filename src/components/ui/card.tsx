import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  className?: string;
  children: React.ReactNode;
  titleAction?: React.ReactNode;
}

export const Card = ({
  title,
  className,
  children,
  titleAction,
}: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden',
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-medium">{title}</h3>
          {titleAction && <div>{titleAction}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </motion.div>
  );
};

export default Card;
