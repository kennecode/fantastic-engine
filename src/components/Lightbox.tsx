import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';
import { useMediaQueries } from 'src/hooks/useMediaQueries';

const LightboxContainer = (props: any) => {
  const dataAttributeValue: string = 'lightbox-container';
  const onClickToClose = (e: any) => {
    const target = e.target.getAttribute('data-widget');
    if (target === dataAttributeValue && typeof props.onClose === 'function')
      props.onClose();
  };

  const isTiny = useMediaQueries('only screen and (min-width: 40em)');
  const isSmall = useMediaQueries('only screen and (min-width: 48em)');
  const isMedium = useMediaQueries('only screen and (min-width: 64em)');
  const isLarge = useMediaQueries('only screen and (min-width: 80em)');
  // console.log({isTiny, isSmall, isMedium, isLarge});
  return (
    <div
      data-widget="lightbox-container"
      style={{
        backgroundColor: 'rgba(0, 0, 0, .85)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={onClickToClose}
    >
      {props.children}
    </div>
  );
};

const LightboxBody = (props: any) => {
  return (
    <div
      style={{
        background: '#fff',
        width: '50%',
        minHeight: 75,
        minWidth: 380,
        maxHeight: '100vh',
        margin: 'auto',
        padding: 15,
        overflowY: 'auto',
      }}
    >
      {props.children}
    </div>
  );
};

export const Lightbox = (props: any) => {
  const { open } = props;
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <ToggleVisibility {...props}>
      <LightboxContainer onClose={props.onClose}>
        <LightboxBody>{props.children}</LightboxBody>
      </LightboxContainer>
    </ToggleVisibility>
  );
};