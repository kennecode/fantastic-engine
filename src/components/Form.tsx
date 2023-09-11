import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';

interface FormActionsProps {
  children: React.ReactNode;
}

export const FormActions = (props: FormActionsProps) => {
  return <div>{props.children}</div>;
};

interface FormButtonProps {
  children: React.ReactNode;
  onClick?: (e: any) => void;
  type?: 'submit' | 'reset' | 'button'; // standard HTML button types
}

export const FormButton = (props: FormButtonProps) => {
  const { onClick, type = 'submit' } = props;
  const handleClick = (e: any) => {
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };
  return (
    <button
      type={type}
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
  );
};

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: any) => void;
  hasError?: boolean;
  errorMessage?: string | null;
}

export const Form = (props: FormProps) => {
  const { onSubmit, hasError = false, errorMessage = null } = props;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(e);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {props.children}
      <ToggleVisibility open={hasError}>
        <div style={{ color: 'red' }}>{errorMessage}</div>
      </ToggleVisibility>
    </form>
  );
};
