import React, { useReducer } from 'preact/compat';
import { surveyReducer, initialSurveyState } from './reducers/surveyReducer';
import { Lightbox } from 'src/components/Lightbox';
import { Attention } from 'src/components/Attention';
import { Splash } from 'src/components/Splash';
import { ToggleVisibility } from 'src/components/ToggleVisibility';
import { Survey, SurveyQuestion } from 'src/components/Survey';
import {
  DataListFieldGroup,
  TextareaFieldGroup,
  TextFieldGroup,
} from 'src/components/Field';
import { Form, FormActions, FormButton } from 'src/components/Form';
import { Confirmation } from 'src/components/Confirmation';
import { CheckboxFieldGroup } from 'src/components/Field/CheckboxFieldGroup';
import { useAutofocus } from 'src/hooks/useAutofocus';
import { AppProps } from 'src/interfaces';

const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export default function App({ open, splash, form, attributes = {} }: AppProps) {
  const { text, attributes: openAttributes } = open;
  const {
    fields,
    nextButton = { text: null, attributes: {} },
    backButton = { text: null, attributes: {} },
    submitButton = { text: null, attributes: {} },
  } = form;
  const { text: nextText, attributes: nextButtonAttributes } = nextButton;
  const { text: backText, attributes: backButtonAttributes } = backButton;
  const { text: submitText, attributes: submitButtonAttributes } = submitButton;
  const [survey, dispatchSurvey] = useReducer(surveyReducer, {
    ...initialSurveyState,
    ...{
      hasSplash: !!splash,
    },
  });

  if (survey?.fieldCount === null && form?.fields?.length) {
    const fields = form.fields.map((f) => {
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
    const { name, type, attributes = {} } = fields[survey.step];
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
    const { name } = fields[survey.step];
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

  const FieldComponents: any = {
    checkbox: CheckboxFieldGroup,
    radio: CheckboxFieldGroup,
    select: DataListFieldGroup,
    datalist: DataListFieldGroup,
    text: TextFieldGroup,
    email: TextFieldGroup,
    password: TextFieldGroup,
    tel: TextFieldGroup,
    textarea: TextareaFieldGroup,
  };

  const { name } = fields[survey.step];
  useAutofocus(name);

  return (
    <>
      <Attention
        onClick={() =>
          dispatchSurvey({
            type: 'open',
          })
        }
        {...openAttributes}
      >
        {text || 'Open Survey'}
      </Attention>
      <Lightbox {...attributes} open={survey.open} onClose={() => close()}>
        <Splash
          open={survey.showSplash}
          {...splash}
          onContinue={() =>
            dispatchSurvey({
              type: 'showForm',
            })
          }
        />
        <ToggleVisibility open={survey.showForm}>
          <ToggleVisibility open={!survey.posting}>
            <Form
              onSubmit={submitForm}
              hasError={survey.hasError}
              errorMessage={survey.errorMessage}
            >
              <Survey>
                {form?.fields?.map((field, i) => {
                  const FieldComponent = FieldComponents[field.type];

                  if (!FieldComponent) {
                    return (
                      <SurveyQuestion
                        key={`question${i}`}
                        open={survey.step === i}
                        hasNext={survey.hasNext}
                        hasPrevious={survey.hasPrevious}
                        onNext={gotoNextQuestion}
                        onPrevious={gotoPreviousQuestion}
                        nextButtonAttributes={nextButtonAttributes}
                        nextText={nextText}
                        backButtonAttributes={backButtonAttributes}
                        backText={backText}
                      >
                        <span>Control is not supported</span>
                      </SurveyQuestion>
                    );
                  }

                  return (
                    <SurveyQuestion
                      key={`question${i}`}
                      open={survey.step === i}
                      hasNext={survey.hasNext}
                      hasPrevious={survey.hasPrevious}
                      onNext={gotoNextQuestion}
                      onPrevious={gotoPreviousQuestion}
                      nextButtonAttributes={nextButtonAttributes}
                      nextText={nextText}
                      backButtonAttributes={backButtonAttributes}
                      backText={backText}
                    >
                      <FieldComponent
                        name={field.name}
                        label={field.label}
                        description={field.description}
                        type={field.type}
                        onChange={captureFormData}
                        value={survey.data[field.name]}
                        autofocus={survey.step === i}
                        hasError={
                          !survey.fieldErrors ||
                          survey.fieldErrors[field.name] ||
                          false
                        }
                        containerAttributes={field.containerAttributes}
                        {...(field.attributes || {})}
                        options={field.options}
                      />
                    </SurveyQuestion>
                  );
                })}
              </Survey>
              <ToggleVisibility open={survey.step + 1 === survey.fieldCount}>
                <FormActions>
                  <FormButton {...submitButtonAttributes}>
                    {submitText || 'Submit'}
                  </FormButton>
                </FormActions>
              </ToggleVisibility>
            </Form>
          </ToggleVisibility>
          <ToggleVisibility open={survey.posting}>
            <div>Please wait while we save your data.</div>
          </ToggleVisibility>
        </ToggleVisibility>
        <ToggleVisibility open={survey.showConfirmation}>
          <Confirmation>
            Thank you!
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                dispatchSurvey({
                  type: 'close',
                });
              }}
            >
              Close this window
            </a>
          </Confirmation>
        </ToggleVisibility>
      </Lightbox>
    </>
  );
}
