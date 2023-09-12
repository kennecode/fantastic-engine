import React, { useEffect } from 'react';

export interface CheckboxFieldOptionProps {
  label: string;
  checked?: boolean;
  [key: string]: any; // for other potential attributes
}

export const CheckboxFieldOption = (props: CheckboxFieldOptionProps) => {
  const {
    type = 'checkbox',
    position,
    name,
    value,
    label,
    checked = false,
    ...rest
  } = props;
  const forLabel = `${name}_${position}`;
  return (
    <div>
      <input
        id={forLabel}
        type={type}
        name={name}
        value={value}
        checked={checked}
        {...rest}
      />
      <label for={forLabel}>{label}</label>
    </div>
  );
};

export interface CheckboxFieldProps {
  value: string;
  options?: { value: string; label: string }[];
  [key: string]: any; // for other potential attributes
}

export const CheckboxField = (props: CheckboxFieldProps) => {
  const {
    name,
    label,
    pattern,
    required,
    value = {},
    options = [],
    onChange = (e: any) => {},
    ...rest
  } = props;

  const defaultChecked = options.reduce((acc: any, r) => {
    acc[r.value] = false;
    return acc;
  }, {});
  const [checked, setChecked] = React.useState({ ...defaultChecked, ...value });

  const checkboxHandler = (e: any) => {
    setChecked({ ...checked, [e.target.value]: e.target.checked });
  };

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange({ [name]: checked });
    }
  }, [checked]);

  return (
    <>
      <div>{label}</div>
      {options.map((r: any, id: number) => {
        const checkboxName = r.type === 'radio' ? name : `${name}_${r.value}`;
        const inputChecked = checked[r.value] || false;
        return (
          <CheckboxFieldOption
            name={checkboxName}
            position={id}
            value={r.value}
            label={r.label}
            onChange={checkboxHandler}
            checked={inputChecked}
            {...rest}
          />
        );
      })}
    </>
  );
};
