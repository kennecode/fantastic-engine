import React from 'preact/compat';

interface ConfirmationProps {
  children: React.ReactNode;
}

export const Confirmation = (props: ConfirmationProps) => {
  return <div>{props.children}</div>;
};
