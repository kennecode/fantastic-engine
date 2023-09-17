import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';

export * from './Field/index';

export interface FieldProps {
  className?: string;
  label: string;
  labelFor: string;
  description?: string;
  children: React.ReactNode;
  hasError?: boolean;
}

export const Field = ({
  className = 'control',
  label,
  labelFor,
  description,
  children,
  hasError = false,
}: FieldProps) => {
  return (
    <div className={className}>
      <label className="field-label" for={labelFor}>
        {label}
      </label>
      <ToggleVisibility open={!!description}>
        <div className={'field-description'}>{description}</div>
      </ToggleVisibility>
      <div className="field-input">{children}</div>
      <ToggleVisibility open={hasError}>
        <div className="field-error">Please fill this out</div>
      </ToggleVisibility>
    </div>
  );
};
