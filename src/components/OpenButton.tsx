import React from 'preact/compat';

interface OpenButtonProps {
  text?: string;
}

export const OpenButton = ({ text }: OpenButtonProps) => {
  return text ? <button>{text}</button> : null;
};
