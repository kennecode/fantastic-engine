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
  hasError = false,
  ...restProps
}: DataListFieldGroupProps): any => {
  return (
    <Field
      labelFor={name}
      label={label}
      description={description}
      hasError={hasError}
    >
      <DataListField {...restProps} id={name} name={name} />
    </Field>
  );
};
