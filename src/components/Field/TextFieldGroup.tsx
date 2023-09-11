import React from 'react';
import { Field, TextField } from 'src/components/Field';
import { TextFieldProps } from 'src/components/Field/TextField';

export interface TextFieldGroupProps extends TextFieldProps {
  name: string;
  label: string;
  description?: string;
  type: string; // Input type e.g., "text", "number", "password", etc.
  placeholder?: string;
  autofocus?: boolean;
  value?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
}

export const TextFieldGroup = ({
  name,
  label,
  description,
  type,
  placeholder,
  required = false,
  pattern,
  autofocus = false,
  hasError = false,
  value = '',
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
}: TextFieldGroupProps) => {
  return (
    <Field
      labelFor={name}
      label={label}
      description={description}
      hasError={hasError}
    >
      <TextField
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        autofocus={autofocus}
        value={value}
      />
    </Field>
  );
};
