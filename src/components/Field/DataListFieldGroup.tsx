import React from 'react';
import { Field } from 'src/components/Field';
import {
  DataListField,
  DataListFieldProps,
} from 'src/components/Field/DataListField';

export interface DataListFieldGroupProps extends DataListFieldProps {
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

export const DataListFieldGroup = ({
  name,
  label,
  description,
  type,
  placeholder,
  options = [],
  autofocus = false,
  value = '',
  required = false,
  hasError = false,
  pattern,
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
}: DataListFieldGroupProps): any => {
  return (
    <Field
      labelFor={name}
      label={label}
      description={description}
      hasError={hasError}
    >
      <DataListField
        type={type}
        id={name}
        name={name}
        options={options}
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
