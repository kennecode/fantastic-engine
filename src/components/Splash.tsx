import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';

const SplashHeadline = (props: any) => <h1>{props.children}</h1>;

const SplashSubline = (props: any) => <h2>{props.children}</h2>;

const SplashEyebrow = (props: any) => <h3>{props.children}</h3>;

const SplashBody = (props: any) => <p>{props.children}</p>;

const SplashButton = (props: any) => {
  const { children, onContinue } = props;
  return (
    <div>
      <button onClick={() => onContinue()}>{children}</button>
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
      <SplashButton onContinue={props.onContinue}>Continue</SplashButton>
    </ToggleVisibility>
  );
};
