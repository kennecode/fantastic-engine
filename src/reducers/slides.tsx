export const initialSlideState = {
  step: 0,
  form: [],
  action: null,
  method: null,
  count: null,
  data: {},
  storage_key: 'form',
};

const restoreFromLocalStorage = (key, initialValue) => {
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

const saveToLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // do nothing
  }
};

export const slidesReducer = (state, action) => {
  switch (action.type) {
    case 'create':
      // restore from local storage
      return {
        ...state,
        ...{
          form: action.form,
          action: action.action,
          method: action.method,
          count: action.form.length,
          data: restoreFromLocalStorage(state.storage_key, state.data),
        },
      };
    case 'next':
      if (state.step + 1 === state.count) {
        return state;
      }
      return { ...state, step: state.step + 1 };
    case 'previous':
      if (state.step - 1 < 0) {
        return state;
      }
      return { ...state, step: state.step - 1 };
    case 'save':
      const changedData = { ...state.data, ...action.data };
      saveToLocalStorage(state.storage_key, changedData);
      return { ...state, data: changedData };
    default:
      return state;
  }
};
