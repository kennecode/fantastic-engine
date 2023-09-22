import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';
import { FormButton } from 'src/components/Form';
import { FieldAttributes } from 'src/interfaces';

interface SurveyQuestionProps {
  children: React.ReactNode | string;
  onNext?: (e: any) => void;
  onPrevious?: (e: any) => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  open: boolean;
  nextText?: string | undefined | null;
  backText?: string | undefined | null;
  nextButtonAttributes?: FieldAttributes;
  backButtonAttributes?: FieldAttributes;
}

const PreviousLink = ({ text, onHandlePrevious, ...rest }: any) => (
  <div>
    <a href="#" onClick={onHandlePrevious} {...rest}>
      {text}
    </a>
  </div>
);

const NextButton = ({ text, onHandleNext, ...rest }: any) => (
  <div>
    <FormButton {...rest} type="button" onClick={onHandleNext}>
      {text}
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
  nextButtonAttributes,
  nextText,
  backButtonAttributes,
  backText,
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
        {hasPrevious && (
          <PreviousLink
            text={backText || '‹'}
            {...backButtonAttributes}
            onHandlePrevious={onHandlePrevious}
          />
        )}
        <div>{children}</div>
        {hasNext && (
          <NextButton
            text={nextText || '‹'}
            {...nextButtonAttributes}
            onHandleNext={onHandleNext}
          />
        )}
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
