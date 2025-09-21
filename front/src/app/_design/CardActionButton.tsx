import { Button, ButtonProps } from '@heroui/react';
import classNames from 'classnames';

export default function CardActionButton({ children, className, ...rest }:
{ children: React.ReactNode } & ButtonProps) {
  return (
    <Button
      variant="light"
      size="sm"
      className={classNames('w-8 h-8 p-0 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800', className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Button>
  );
}
