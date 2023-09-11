import {
  restoreFromLocalStorage,
  saveToLocalStorage,
} from 'src/utilities/localStorage';

interface SurveyStatField {
  name: string;
  required: boolean;
  pattern?: string | null;
}

interface SurveyState {
  step: number;
  fields: SurveyStatField[];
  fieldCount: number | null;
  fieldErrors: Record<string, string> | undefined;
  hasError: boolean;
  errorMessage?: string;
  hasPrevious: boolean;
  hasNext: boolean;
  data: Record<string, any>;
  storage_key: string;
  posting: boolean;
  postError?: string | null;
  open: boolean;
  hasSplash: boolean;
  showSplash: boolean;
  showForm: boolean;
  showConfirmation: boolean;
  successfulPost?: boolean;
  postResponse?: any;
}

type SurveyAction =
  | { type: 'create'; fields: SurveyStatField[]; fieldCount: number }
  | { type: 'next' }
  | { type: 'previous' }
  | { type: 'reset' }
  | { type: 'open' }
  | { type: 'close' }
  | { type: 'showSplash' }
  | { type: 'showForm' }
  | { type: 'showConfirmation' }
  | { type: 'posting' }
  | { type: 'successfulPost'; response: any }
  | { type: 'hasError'; errorMessage?: string; field?: string }
  | { type: 'resetError'; field?: string }
  | { type: 'save'; data: Record<string, any> };

export const initialSurveyState: SurveyState = {
  step: 0,
  hasNext: true,
  hasPrevious: false,
  fields: [],
  fieldErrors: {},
  fieldCount: null,
  data: {},
  storage_key: 'form',
  posting: false,
  open: false,
  hasSplash: false,
  showSplash: true,
  showForm: false,
  showConfirmation: false,
  hasError: false,
};

const removeParameterFromError = (
  field: string | undefined,
  fieldErrors: Record<string, string> | undefined
) => {
  if (!field || !fieldErrors) {
    return fieldErrors;
  }
  const { [field]: removedProperty, ...remainingObject } = fieldErrors;
  return remainingObject;
};

export const surveyReducer = (
  state: SurveyState,
  action: SurveyAction
): SurveyState => {
  switch (action.type) {
    case 'create':
      // restore from local storage
      const data = restoreFromLocalStorage(state.storage_key, state.data);
      return {
        ...state,
        ...{
          fields: action.fields,
          fieldCount: action.fieldCount,
          data,
        },
      };

    case 'next':
      if (state.step + 1 === state.fieldCount) {
        return state;
      }
      const nextStep = state.step + 1;
      let nextHasNext = false,
        nextHasPrevious = false;
      if (typeof state.fieldCount === 'number') {
        nextHasNext = nextStep + 1 < state.fieldCount;
        nextHasPrevious = nextStep - 1 >= 0;
      }

      return {
        ...state,
        step: state.step + 1,
        hasNext: nextHasNext,
        hasPrevious: nextHasPrevious,
      };

    case 'previous':
      if (state.step - 1 < 0) {
        return state;
      }
      const previousStep = state.step - 1;
      let previousHasNext = false,
        previousHasPrevious = false;
      if (typeof state.fieldCount === 'number') {
        previousHasNext = previousStep + 1 < state.fieldCount;
        previousHasPrevious = previousStep - 1 >= 0;
      }
      return {
        ...state,
        step: state.step - 1,
        hasNext: previousHasNext,
        hasPrevious: previousHasPrevious,
      };

    case 'save':
      const changedData = { ...state.data, ...action.data };
      saveToLocalStorage(state.storage_key, changedData);
      return { ...state, data: changedData };

    case 'reset':
      const resetData = {};
      saveToLocalStorage(state.storage_key, resetData);
      return { ...state, data: resetData };

    case 'open':
      return {
        ...state,
        ...{
          open: true,
          showSplash: state.hasSplash,
          showForm: !state.hasSplash,
        },
      };

    case 'close':
      return {
        ...state,
        ...{
          open: false,
          step: 0,
          hasPrevious: false,
          hasNext: true,
          showSplash: state.hasSplash,
          showForm: !state.hasSplash,
          showConfirmation: false,
        },
      };

    case 'showSplash':
      return {
        ...state,
        ...{
          showForm: false,
          showSplash: true,
          showConfirmation: false,
        },
      };

    case 'showForm':
      return {
        ...state,
        ...{
          showForm: true,
          showSplash: false,
          showConfirmation: false,
        },
      };

    case 'showConfirmation':
      return {
        ...state,
        ...{
          showForm: false,
          showSplash: false,
          showConfirmation: true,
        },
      };

    case 'posting':
      return {
        ...state,
        ...{
          posting: true,
        },
      };

    case 'successfulPost':
      return {
        ...state,
        ...{
          step: 0,
          posting: false,
          postResponse: action.response,
        },
      };

    case 'hasError':
      const { errorMessage, field } = action;
      return {
        ...state,
        ...{
          hasError: true,
          errorMessage: errorMessage,
          fieldErrors: {
            ...state.fieldErrors,
            [field as string]: 'Please enter this',
          },
        },
      };

    case 'resetError':
      return {
        ...state,
        ...{
          hasError: false,
          errorMessage: undefined,
          fieldErrors: removeParameterFromError(
            action?.field,
            state?.fieldErrors
          ),
        },
      };

    default:
      return state;
  }
};
