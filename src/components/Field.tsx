import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';

export * from './Field/index';

export interface FieldProps {
  label: string;
  labelFor: string;
  description?: string;
  children: React.ReactNode;
  hasError?: boolean;
  required?: boolean;
}

export const Field = ({
  label,
  labelFor,
  description,
  children,
  hasError = false,
  required = false,
}: FieldProps) => {
  return (
    <>
      <label for={labelFor}>{label}</label>
      <ToggleVisibility open={!!description}>
        <div>{description}</div>
      </ToggleVisibility>
      {children}
      <ToggleVisibility open={hasError}>
        <div>Please fill this out</div>
      </ToggleVisibility>
    </>
  );
};
