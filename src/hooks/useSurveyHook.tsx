import { useReducer } from 'preact/compat';
import { surveyReducer, initialSurveyState } from '../reducers/surveyReducer';

const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export const useSurvey = (form: any) => {
  const [survey, dispatchSurvey] = useReducer(surveyReducer, {
    ...initialSurveyState,
    hasSplash: !!form.splash,
  });

  if (survey?.fieldCount === null && form?.fields?.length) {
    const fields = form.fields.map((f: any) => {
      return {
        name: f.name,
        required: f?.attributes?.required || false,
        pattern: f?.attributes?.pattern || null,
      };
    });
    dispatchSurvey({
      type: 'create',
      fields: fields,
      fieldCount: fields.length,
    });
  }

  const close = () => {
    dispatchSurvey({
      type: 'close',
    });
  };

  const captureFormData = (e: any) => {
    if (e.target) {
      dispatchSurvey({
        type: 'save',
        data: {
          [e.target.name]: e.target.value,
        },
      });
      return;
    }
    dispatchSurvey({
      type: 'save',
      data: e,
    });
  };

  const submitForm = async (e: any) => {
    try {
      const hasError = handleValidation();
      if (hasError) {
        return false;
      }

      dispatchSurvey({
        type: 'posting',
      });

      const { action = '#', method = 'post' } = form;

      const formData = Object.entries(survey.data).reduce(
        (acc: any, field: any) => {
          if (typeof field[1] === 'object') {
            Object.entries(field[1]).forEach(([key, value]) => {
              acc.append(`${field[0]}[${key}]`, value);
            });
          } else {
            acc.append(field[0], field[1]);
          }
          return acc;
        },
        new FormData()
      );
      await fetch(action, {
        body: formData,
        method: method,
      });
      dispatchSurvey({
        type: 'successfulPost',
        response: 'Success!',
      });
      dispatchSurvey({
        type: 'showConfirmation',
      });
    } catch (error) {
      dispatchSurvey({
        type: 'hasError',
        errorMessage:
          'Uh oh, we had trouble saving your details. Give us a moment and try again.',
      });
    }
  };

  const dispatchSurveyError = (message: string, field?: string) => {
    dispatchSurvey({
      type: 'hasError',
      errorMessage: message,
      field: field,
    });
  };

  const isEmptyString = (value: any) =>
    typeof value === 'string' && value.trim() === '';

  const isObjectEmpty = (value: any) =>
    typeof value === 'object' && !Object.values(value).some((v) => v);

  const doesNotMatchPattern = (pattern: any, value: any) =>
    pattern && !value?.match(pattern);

  const isInvalidEmail = (type: any, value: any) =>
    type === 'email' && !value.match(EMAIL_REGEX);

  const handleValidation = () => {
    const { name, type, attributes = {} } = survey.fields[survey.step];
    const { required, pattern } = attributes;
    const value = survey.data[name];

    if (required && (isEmptyString(value) || isObjectEmpty(value))) {
      dispatchSurveyError(`Please enter ${name}`, name);
      return true;
    }

    if (doesNotMatchPattern(pattern, value)) {
      dispatchSurveyError(`Please correct the ${name} field`, name);
      return true;
    }

    if (isInvalidEmail(type, value)) {
      dispatchSurveyError(`Please provide a valid email for ${name}`, name);
      return true;
    }

    return false;
  };

  const gotoNextQuestion = (e: any) => {
    const { name } = survey.fields[survey.step];
    const hasError = handleValidation();
    if (!hasError) {
      dispatchSurvey({
        type: 'resetError',
        field: name,
      });
      dispatchSurvey({
        type: 'next',
      });
    }
  };

  const gotoPreviousQuestion = (e: any) => {
    dispatchSurvey({
      type: 'previous',
    });
  };

  return {
    survey,
    dispatchSurvey,
    close,
    captureFormData,
    submitForm,
    handleValidation,
    gotoNextQuestion,
    gotoPreviousQuestion,
  };
};
