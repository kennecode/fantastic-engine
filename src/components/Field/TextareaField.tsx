import React from 'react';

export interface TextareaFieldProps {
  [key: string]: any; // for the rest of the input attributes
}

export const TextareaField = (props: TextareaFieldProps) => {
  const { required, ...rest } = props;
  return <textarea data-required={required} {...rest} />;
};
