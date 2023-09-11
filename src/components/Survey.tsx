import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';

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
            <button type="button" onClick={onHandlePrevious}>
              Previous
            </button>
          </div>
        </ToggleVisibility>
        <div>{children}</div>
        <ToggleVisibility open={hasNext}>
          <div>
            <button type="button" onClick={onHandleNext}>
              Next
            </button>
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
      <div>Survey</div>
      <div>{props.children}</div>
    </>
  );
};
