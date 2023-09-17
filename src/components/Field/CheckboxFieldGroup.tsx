import React from 'react';
import { CheckboxField, CheckboxFieldProps, Field } from 'src/components/Field';

export interface CheckboxFieldGroupProps extends CheckboxFieldProps {
  description?: string;
  type: string; // Input type e.g., "text", "number", "password", etc.
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
}

export const CheckboxFieldGroup = ({
  className = 'control',
  name,
  label,
  description,
  type,
  options = [],
  value = '',
  hasError = false,
  pattern,
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
}: CheckboxFieldGroupProps): any => {
  return (
    <Field
      className={className}
      labelFor={name}
      label={label}
      description={description}
      hasError={hasError}
    >
      <CheckboxField
        type={type}
        id={name}
        name={name}
        options={options}
        pattern={pattern}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
      />
    </Field>
  );
};
