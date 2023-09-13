import React from 'preact/compat';

type ToggleVisibilityProps = {
  children: React.ReactNode;
  open: boolean;
  useCss?: boolean;
};

export const ToggleVisibility = (props: ToggleVisibilityProps) => {
  const { children, open, useCss } = props;
  if (!open && !useCss) {
    return null;
  }
  if (!useCss) {
    return <>{children}</>;
  }
  const display = open ? 'block' : 'none';
  return <div style={{ display }}>{children}</div>;
};
