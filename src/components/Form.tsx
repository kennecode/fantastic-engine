import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';

interface FormActionsProps {
  children: React.ReactNode;
}

export const FormActions = (props: FormActionsProps) => {
  return <div>{props.children}</div>;
};

const STYLED_BUTTON_CSS = {
  margin: 5,
  padding: '10px 20px',
  backgroundColor: '#090909',
  color: '#efefef',
  border: 'none',
};

interface LinkButtonProps {
  children: React.ReactNode;
  onClick: (e: any) => void;
}

const LinkButton = ({ children, onClick }: LinkButtonProps) => (
  <a href="#" onClick={onClick}>
    {children}
  </a>
);

interface StyledButtonProps {
  type: string;
  children: React.ReactNode;
  onClick: (e: any) => void;
}
const StyledButton = ({ type, children, onClick }: StyledButtonProps) => (
  <button type={type} onClick={onClick} style={STYLED_BUTTON_CSS}>
    {children}
  </button>
);

interface FormButtonProps {
  children: React.ReactNode;
  onClick?: (e: any) => void;
  type?: 'submit' | 'reset' | 'button' | 'link'; // standard HTML button types
}

export const FormButton = ({
  onClick,
  type = 'submit',
  children,
}: FormButtonProps) => {
  const handleClick = (e: any) => {
    onClick?.(e);
  };

  if (type === 'link') {
    return <LinkButton onClick={handleClick}>{children}</LinkButton>;
  }

  return (
    <StyledButton type={type} onClick={handleClick}>
      {children}
    </StyledButton>
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
