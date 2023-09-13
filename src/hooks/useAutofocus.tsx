import { useEffect } from 'preact/compat';

interface useAutofocusProps {
  parameter: unknown;
}

export const useAutofocus = (parameter: string) => {
  if (!parameter) return;
  useEffect(() => {
    const input = document.getElementById(parameter as string);
    input && input.focus();
  }, [parameter]);
};