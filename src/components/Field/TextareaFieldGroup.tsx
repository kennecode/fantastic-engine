import React from 'react';
import { Field } from 'src/components/Field';
import {
  TextareaField,
  TextareaFieldProps,
} from 'src/components/Field/TextareaField';

export interface TextareaFieldGroup extends TextareaFieldProps {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  autofocus?: boolean;
  value?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
}

export const TextareaFieldGroup = ({
  name,
  label,
  description,
  placeholder,
  required = false,
  autofocus = false,
  hasError = false,
  value = '',
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
}: TextareaFieldGroup) => {
  return (
    <Field
      labelFor={name}
      label={label}
      description={description}
      hasError={hasError}
    >
      <div>
        <TextareaField
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autofocus={autofocus}
          value={value}
          hasError={hasError}
        />
      </div>
    </Field>
  );
};
