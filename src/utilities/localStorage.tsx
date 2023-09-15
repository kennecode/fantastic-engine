export const restoreFromLocalStorage = (
  key: string,
  initialValue: any
): any => {
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // If error also return initialValue
    return initialValue;
  }
};

export const saveToLocalStorage = (key: string, value: any): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // do nothing
  }
};
