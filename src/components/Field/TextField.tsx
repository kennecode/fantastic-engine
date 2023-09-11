import React from 'react';

export interface TextFieldProps {
  [key: string]: any; // for the rest of the input attributes
}

export const TextField = (props: TextFieldProps) => {
  const { name, pattern, required, ...rest } = props;
  return (
    <input
      key={`field-${name}`}
      name={name}
      data-pattern={pattern}
      data-required={required}
      {...rest}
    />
  );
};
