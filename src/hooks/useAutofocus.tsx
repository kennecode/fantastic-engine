import { useEffect } from 'preact/compat';

export const useAutofocus = (parameter: any) => {
  if (!parameter) return;
  useEffect(() => {
    const input = document.getElementById(parameter as string);
    input && input.focus();
  }, [parameter]);
};
