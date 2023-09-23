import React from 'preact/compat';
import {
  DataListFieldGroup,
  TextareaFieldGroup,
  TextFieldGroup,
  CheckboxFieldGroup,
} from 'src/components/Field';
import { Survey, SurveyQuestion } from 'src/components/Survey';

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

export const SurveyForm = ({
  form,
  survey,
  captureFormData,
  gotoNextQuestion,
  gotoPreviousQuestion,
}: any) => {
  const {
    nextButton = { text: null, attributes: {} },
    backButton = { text: null, attributes: {} },
  } = form;
  const { text: nextText, attributes: nextButtonAttributes } = nextButton;
  const { text: backText, attributes: backButtonAttributes } = backButton;
  return (
    <Survey>
      {form.fields.map((field: any, i: number) => {
        const FieldComponent = FieldComponents[field.type] || (
          <span>Control is not supported</span>
        );
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
                !survey.fieldErrors || survey.fieldErrors[field.name] || false
              }
              containerAttributes={field.containerAttributes}
              {...(field.attributes || {})}
              options={field.options}
            />
          </SurveyQuestion>
        );
      })}
    </Survey>
  );
};
