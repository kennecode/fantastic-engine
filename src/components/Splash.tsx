import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';
import { FormButton } from 'src/components/Form';

const SplashHeadline = (props: any) => (
  <h1 className="splash-headline">{props.children}</h1>
);

const SplashSubline = (props: any) => (
  <h2 className="splash-subline">{props.children}</h2>
);

const SplashEyebrow = (props: any) => (
  <h3 className="splash-eyebrow">{props.children}</h3>
);

const SplashBody = (props: any) => <p>{props.children}</p>;

const SplashButton = (props: any) => {
  const { children, onContinue, ...rest } = props;
  return (
    <div>
      <FormButton {...rest} onClick={() => onContinue()}>
        {children}
      </FormButton>
    </div>
  );
};

export const Splash = (props: any) => {
  return (
    <ToggleVisibility {...props}>
      <SplashEyebrow>{props.eyebrow}</SplashEyebrow>
      <SplashHeadline>{props.headline}</SplashHeadline>
      <SplashSubline>{props.subline}</SplashSubline>
      <SplashBody>{props.body}</SplashBody>
      <SplashButton class="btn btn-continue" onContinue={props.onContinue}>
        Continue
      </SplashButton>
    </ToggleVisibility>
  );
};
