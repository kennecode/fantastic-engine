import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';

interface FormActionsProps {
  children: React.ReactNode;
}

export const FormActions = (props: FormActionsProps) => {
  return <div>{props.children}</div>;
};

interface LinkButtonProps {
  children: React.ReactNode;
  onClick: (e: any) => void;
}

const LinkButton = ({ children, onClick, ...rest }: LinkButtonProps) => (
  <a {...rest} href="#" onClick={onClick}>
    {children}
  </a>
);

interface StyledButtonProps {
  type: string;
  children: React.ReactNode;
  onClick: (e: any) => void;
}
const StyledButton = ({
  type,
  children,
  onClick,
  ...rest
}: StyledButtonProps) => (
  <button {...rest} type={type} onClick={onClick}>
    {children}
  </button>
);

interface FormButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: (e: any) => void;
  type?: 'submit' | 'reset' | 'button' | 'link'; // standard HTML button types
}

export const FormButton = ({
  onClick,
  type = 'submit',
  children,
  ...rest
}: FormButtonProps) => {
  const handleClick = (e: any) => {
    onClick?.(e);
  };

  if (type === 'link') {
    return (
      <LinkButton {...rest} onClick={handleClick}>
        {children}
      </LinkButton>
    );
  }

  return (
    <StyledButton {...rest} type={type} onClick={handleClick}>
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
        <div className="form-error">{errorMessage}</div>
      </ToggleVisibility>
    </form>
  );
};
