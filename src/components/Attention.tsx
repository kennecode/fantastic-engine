import React from 'preact/compat';

interface AttentionProps {
  onClick?: (e: any) => void;
  children: React.ReactNode;
}

export const Attention = (props: AttentionProps) => {
  const handleClick = (e: any) => {
    if (typeof props.onClick === 'function') {
      props.onClick(e);
    }
  };
  return (
    <span>
      <button
        type="button"
        onClick={handleClick}
        style={{
          margin: 5,
          padding: '10px 20px',
          backgroundColor: '#090909',
          color: '#efefef',
          border: 'none',
        }}
      >
        {props.children}
      </button>
    </span>
  );
};
