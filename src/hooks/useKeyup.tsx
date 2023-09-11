import { useEffect } from 'preact/compat';

interface KeyCallbacks {
  [key: string]: (event: KeyboardEvent) => void;
}

export const useKeyup = (callbacks: KeyCallbacks) => {
  /**
   * Handle key controls on keyboard
   * @param e
   */
  function formKeyboardControls(e: KeyboardEvent) {
    const { key } = e;
    if (typeof callbacks[key] === 'function') {
      callbacks[key](e);
    }
  }

  /**
   * Bind key controls to document
   */
  useEffect(() => {
    window.addEventListener('keyup', formKeyboardControls);
    return () => {
      document.body.removeEventListener('keyup', formKeyboardControls);
    };
  }, [callbacks]);
};
