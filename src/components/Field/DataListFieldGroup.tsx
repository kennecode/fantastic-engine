import React from 'react';
import { Field } from 'src/components/Field';
import {
  DataListField,
  DataListFieldProps,
} from 'src/components/Field/DataListField';

export interface DataListFieldGroupProps extends DataListFieldProps {
  label: string;
  description?: string;
}

export const DataListFieldGroup = ({
  name,
  label,
  description,
  containerAttributes = {},
  hasError = false,
  ...restProps
}: DataListFieldGroupProps): any => {
  const { className } = containerAttributes;
  return (
    <Field
      className={className}
      labelFor={name}
      label={label}
      description={description}
      hasError={hasError}
      {...containerAttributes}
    >
      <DataListField {...restProps} id={name} name={name} />
    </Field>
  );
};
