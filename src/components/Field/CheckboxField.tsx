import React from 'react';

export interface CheckboxFieldOptionProps {
  label: string;
  checked?: boolean;
  [key: string]: any; // for other potential attributes
}

export const CheckboxFieldOption = (props: CheckboxFieldOptionProps) => {
  const { name, value, label, checked = false, ...rest } = props;
  return (
    <div>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        {...rest}
      />
      <label>{label}</label>
    </div>
  );
};

export interface CheckboxFieldProps {
  value: string;
  options?: { value: string; label: string }[];
  [key: string]: any; // for other potential attributes
}

export const CheckboxField = (props: CheckboxFieldProps) => {
  const { name, label, pattern, required, options = [], ...rest } = props;
  const list_name = `${name}-list`;
  return (
    <>
      <div>{label}</div>
      {options.map((r) => {
        return <CheckboxFieldOption value={r.value} label={r.label} />;
      })}
    </>
  );
};
