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

const PreviousLink = ({ onHandlePrevious }: any) => (
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
);

const NextButton = ({ onHandleNext }: any) => (
  <div>
    <FormButton type="button" onClick={onHandleNext}>
      Next
    </FormButton>
  </div>
);

export const SurveyQuestion = ({
  open = true,
  children,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
}: SurveyQuestionProps) => {
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
        {hasPrevious && <PreviousLink onHandlePrevious={onHandlePrevious} />}
        <div>{children}</div>
        {hasNext && <NextButton onHandleNext={onHandleNext} />}
      </>
    </ToggleVisibility>
  );
};

interface SurveyProps {
  children: React.ReactNode;
}
export const Survey = (props: SurveyProps) => {
  return <div>{props.children}</div>;
};
