import React, { useReducer } from 'preact/compat';
import { surveyReducer, initialSurveyState } from './reducers/surveyReducer';
import { Lightbox } from 'src/components/Lightbox';
import { Attention } from 'src/components/Attention';
import { Splash } from 'src/components/Splash';
import { ToggleVisibility } from 'src/components/ToggleVisibility';
import { Form, FormActions, FormButton } from 'src/components/Form';
import { Confirmation } from 'src/components/Confirmation';
import { AppProps } from 'src/interfaces';
import { SurveyForm } from 'src/components/SurveyForm';
import { useAutofocus } from 'src/hooks/useAutofocus';
import { useSurvey } from 'src/hooks/useSurveyHook';

const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export default function App({ open, splash, form, attributes = {} }: AppProps) {
  const { text, attributes: openAttributes } = open;
  const { fields, submitButton = { text: null, attributes: {} } } = form;
  const { text: submitText, attributes: submitButtonAttributes } = submitButton;
  const {
    survey,
    dispatchSurvey,
    close,
    captureFormData,
    submitForm,
    gotoNextQuestion,
    gotoPreviousQuestion,
  } = useSurvey(form);

  if (survey?.fieldCount === null && form?.fields?.length) {
    const fields = form.fields.map((f) => {
      return {
        name: f.name,
        type: f.type,
        attributes: f?.attributes,
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
            {/*submitForm*/}
            <Form
              onSubmit={() => {
                console.log('submitForm');
              }}
              hasError={survey.hasError}
              errorMessage={survey.errorMessage}
            >
              <>
                <SurveyForm
                  form={form}
                  survey={survey}
                  captureFormData={() => {
                    console.log('captureFormData');
                  }}
                  gotoNextQuestion={gotoNextQuestion}
                  gotoPreviousQuestion={gotoPreviousQuestion}
                />
                <ToggleVisibility open={survey.step + 1 === survey.fieldCount}>
                  <FormActions>
                    <FormButton {...submitButtonAttributes}>
                      {submitText || 'Submit'}
                    </FormButton>
                  </FormActions>
                </ToggleVisibility>
              </>
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
