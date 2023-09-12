import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';
import { FormButton } from 'src/components/Form';

interface SurveyQuestionProps {
  children: React.ReactNode | string;
  onNext?: (e: any) => void;
  onPrevious?: (e: any) => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  open: boolean;
}

export const SurveyQuestion = (props: SurveyQuestionProps) => {
  const {
    open = true,
    children,
    onNext,
    onPrevious,
    hasNext = false,
    hasPrevious = false,
  } = props;

  const onHandleNext = (e: any) => {
    e.preventDefault();
    if (typeof onNext === 'function') {
      onNext(e);
    }
  };
  const onHandlePrevious = (e: any) => {
    e.preventDefault();
    if (typeof onPrevious === 'function') {
      onPrevious(e);
    }
  };

  return (
    <ToggleVisibility open={open} useCss={true}>
      <>
        <ToggleVisibility open={hasPrevious}>
          <div>
            <a
              href="#"
              onClick={onHandlePrevious}
              style={{
                textDecoration: 'none',
                color: '#999',
                fontWeight: 'bold',
              }}
            >
              &#8249;
            </a>
          </div>
        </ToggleVisibility>
        <div>{children}</div>
        <ToggleVisibility open={hasNext}>
          <div>
            <FormButton type="button" onClick={onHandleNext}>
              Next
            </FormButton>
          </div>
        </ToggleVisibility>
      </>
    </ToggleVisibility>
  );
};

interface SurveyProps {
  children: React.ReactNode;
}
export const Survey = (props: SurveyProps) => {
  return (
    <>
      <div>{props.children}</div>
    </>
  );
};
