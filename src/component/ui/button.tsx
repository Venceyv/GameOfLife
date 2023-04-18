import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 border-collapse disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800',
  {
    variants: {
      variant: {
        default:
          'font-rubik-pixel bg-primary-unfilled-color text-white dark:hover:bg-primary-hover-color dark:text-white',
        'default-toggled':
          'font-rubik-pixel bg-primary-hover-color text-white dark:hover:bg-primary-filled-color dark:text-white',
        destructive: 'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline:
          'bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100',
        subtle:
          'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100',
        ghost:
          'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent',
        plain:
          'bg-primary-unfilled-color text-white hover:bg-primary-hover-color dark:hover:bg-primary-hover-color dark:bg-primary-unfilled-color dark:text-slate-900 focus:ring-offset-0 border-primary-border-color dark:border-primary-border-color',
        'plain-filled':
          'bg-primary-filled-color text-white hover:bg-primary-hover-color dark:hover:bg-primary-hover-color dark:bg-primary-filled-color dark:text-slate-900 focus:ring-offset-0 border-primary-border-color dark:border-primary-border-color',
      },
      size: {
        default: 'h-8 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        plain: 'h-3 w-3 rounded-none focus:ring-0 dark:ring-0',
      },
    },
    defaultVariants: {
      variant: 'plain',
      size: 'plain',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
