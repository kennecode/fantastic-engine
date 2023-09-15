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
}

export const TextareaFieldGroup = ({
  name,
  label,
  description,
  hasError = false,
  ...restProps
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
          {...restProps}
          id={name}
          name={name}
          hasError={hasError}
        />
      </div>
    </Field>
  );
};
