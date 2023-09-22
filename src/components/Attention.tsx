import React from 'preact/compat';

interface AttentionProps {
  onClick?: (e: any) => void;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const Attention = ({
  onClick,
  children,
  className = 'open',
  ...rest
}: AttentionProps) => {
  const handleClick = (e: any) => {
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };
  return (
    <span {...rest}>
      <button className={className} type="button" onClick={handleClick}>
        {children}
      </button>
    </span>
  );
};
