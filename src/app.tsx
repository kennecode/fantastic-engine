import React, { useReducer } from 'preact/compat';
import { surveyReducer, initialSurveyState } from './reducers/surveyReducer';
import { Lightbox } from 'src/components/Lightbox';
import { useKeyup } from 'src/hooks/useKeyup';
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

interface FieldAttributes {
  required?: boolean | undefined | null;
  pattern?: string | null;
  [key: string]: any; // For additional properties
}

interface FormField {
  name: string;
  type: string;
  label: string;
  description?: string;
  attributes?: FieldAttributes;
  options?: { value: string; label: string }[];
}

interface Form {
  fields: FormField[];
}

interface SplashProps {
  // assuming splash properties here, as they aren't clearly defined in the provided code
  title?: string;
  message?: string;
  [key: string]: any;
}

interface AppProps {
  openText?: string;
  splash?: SplashProps;
  form: Form;
}

export default function App(props: AppProps) {
  const { openText, splash } = props;
  const { form } = props;
  const { fields } = form;
  const [survey, dispatchSurvey] = useReducer(surveyReducer, {
    ...initialSurveyState,
    ...{
      hasSplash: !!splash,
    },
  });

  if (survey?.fieldCount === null && props.form?.fields?.length) {
    const fields = props.form.fields.map((f) => {
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
    dispatchSurvey({
      type: 'save',
      data: {
        [e.target.name]: e.target.value,
      },
    });
  };

  const submitForm = (e: any) => {
    // what are we doing?
    dispatchSurvey({
      type: 'posting',
    });
    setTimeout(() => {
      dispatchSurvey({
        type: 'successfulPost',
        response: 'Success!',
      });
      dispatchSurvey({
        type: 'showConfirmation',
      });
    }, 5000);
  };

  const dispatchSurveyError = (message: string, field?: string) => {
    dispatchSurvey({
      type: 'hasError',
      errorMessage: message,
      field: field,
    });
  };

  const handleValidation = () => {
    const { name, type, attributes = {} } = fields[survey.step];
    const { required, pattern } = attributes;
    if (required && (!survey.data[name] || !survey.data[name].length)) {
      dispatchSurveyError(`Please enter ${name}`, name);
      return true;
    }
    const value = survey.data[name];
    if (pattern && !value?.match(pattern)) {
      dispatchSurveyError(`Please correct the ${name} field`, name);
      return true;
    }
    if (
      type === 'email' &&
      !value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    ) {
      dispatchSurveyError(`Please correct the ${name} field`, name);
      return true;
    }
    return false;
  };

  const handleNext = (e: any) => {
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

  const handlePrevious = (e: any) => {
    // @TODO Decide if going to the previous step with an invalid field should be ok
    dispatchSurvey({
      type: 'previous',
    });
  };

  const resetForm = (e: any) => {
    dispatchSurvey({
      type: 'reset',
    });
  };

  const checkboxInputs = ['checkbox'];
  const dataListInputs = ['select', 'datalist'];
  const textInputs = ['text', 'email', 'password', 'tel', 'textarea'];
  const textareaInputs = ['textarea'];

  useKeyup({
    Escape: () => {
      close();
    },
  });

  return (
    <>
      <Attention
        onClick={() =>
          dispatchSurvey({
            type: 'open',
          })
        }
      >
        {openText || 'Open Survey'}
      </Attention>
      <Lightbox open={survey.open} onClose={() => close()}>
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
                {props?.form?.fields?.map((field, i) => {
                  const attributes = field.attributes || {};
                  if (checkboxInputs.includes(field.type)) {
                    return (
                      <SurveyQuestion
                        key={`question${i}`}
                        open={survey.step === i}
                        hasNext={survey.hasNext}
                        hasPrevious={survey.hasPrevious}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                      >
                        <CheckboxFieldGroup
                          name={field.name}
                          label={field.label}
                          description={field.description}
                          type={field.type}
                          onChange={captureFormData}
                          value={survey.data[field.name]}
                          {...attributes}
                          options={field.options}
                          hasError={
                            !survey.fieldErrors ||
                            survey.fieldErrors[field.name] ||
                            false
                          }
                        />
                      </SurveyQuestion>
                    );
                  } else if (dataListInputs.includes(field.type)) {
                    return (
                      <SurveyQuestion
                        key={`question${i}`}
                        open={survey.step === i}
                        hasNext={survey.hasNext}
                        hasPrevious={survey.hasPrevious}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                      >
                        <DataListFieldGroup
                          name={field.name}
                          label={field.label}
                          description={field.description}
                          type={field.type}
                          onChange={captureFormData}
                          value={survey.data[field.name]}
                          {...attributes}
                          options={field.options}
                          hasError={
                            !survey.fieldErrors ||
                            survey.fieldErrors[field.name] ||
                            false
                          }
                        />
                      </SurveyQuestion>
                    );
                  } else if (textInputs.includes(field.type)) {
                    return (
                      <SurveyQuestion
                        key={`question${i}`}
                        open={survey.step === i}
                        hasNext={survey.hasNext}
                        hasPrevious={survey.hasPrevious}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                      >
                        <TextFieldGroup
                          name={field.name}
                          label={field.label}
                          description={field.description}
                          type={field.type}
                          autofocus={survey.step === i}
                          onChange={captureFormData}
                          value={survey.data[field.name]}
                          hasError={
                            !survey.fieldErrors ||
                            survey.fieldErrors[field.name] ||
                            false
                          }
                          {...attributes}
                        />
                      </SurveyQuestion>
                    );
                  } else if (textareaInputs.includes(field.type)) {
                    return (
                      <SurveyQuestion
                        key={`question${i}`}
                        open={survey.step === i}
                        hasNext={survey.hasNext}
                        hasPrevious={survey.hasPrevious}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                      >
                        <TextareaFieldGroup
                          name={field.name}
                          label={field.label}
                          description={field.description}
                          autofocus={survey.step === i}
                          onChange={captureFormData}
                          value={survey.data[field.name]}
                          hasError={
                            !survey.fieldErrors ||
                            survey.fieldErrors[field.name] ||
                            false
                          }
                          {...attributes}
                        />
                      </SurveyQuestion>
                    );
                  } else {
                    return (
                      <SurveyQuestion
                        key={`question${i}`}
                        open={survey.step === i}
                        hasNext={survey.hasNext}
                        hasPrevious={survey.hasPrevious}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                      >
                        <span>Control is not support</span>
                      </SurveyQuestion>
                    );
                  }
                })}
              </Survey>
              <ToggleVisibility open={survey.step + 1 === survey.fieldCount}>
                <FormActions>
                  {/*<FormButton type="button" onClick={resetForm}>Reset</FormButton>*/}
                  <FormButton>Submit</FormButton>
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
