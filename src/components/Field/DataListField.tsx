import React from 'react';

export interface DataListFieldOptionProps {
  value: string;
  label: string;
  [key: string]: any; // for other potential attributes
}

export const DataListFieldOption = (props: DataListFieldOptionProps) => {
  const { value, label, ...rest } = props;
  return (
    <option value={value} {...rest}>
      {label}
    </option>
  );
};

export interface DataListFieldProps {
  name: string;
  options?: { value: string; label: string }[];
  className?: string;
  [key: string]: any; // for the rest of the input attributes
}

export const DataListField = (props: DataListFieldProps) => {
  const { name, pattern, required, options = [], ...rest } = props;
  const list_name = `${name}-list`;
  return (
    <>
      <datalist id={list_name}>
        <select name={name}>
          {options.map((r) => {
            return <DataListFieldOption value={r.value} label={r.label} />;
          })}
        </select>
      </datalist>
      <input
        type="text"
        name={name}
        data-pattern={pattern}
        data-required={required}
        list={list_name}
        {...rest}
      />
    </>
  );
};
