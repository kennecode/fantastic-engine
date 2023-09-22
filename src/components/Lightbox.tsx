import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';

const containerStyles = {
  backgroundColor: 'rgba(0, 0, 0, .85)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
};

const bodyStyles = {
  background: '#fff',
  maxHeight: '100vh',
  margin: 'auto',
  overflowY: 'auto',
};

interface LightboxContainerProps {
  onClose: () => void;
  children: React.ReactNode;
}

const LightboxContainer = ({
  onClose,
  children,
  ...rest
}: LightboxContainerProps) => {
  const dataAttributeValue = 'lightbox-container';
  const onClickToClose = (e: any) => {
    const target = e.target.getAttribute('data-widget');
    if (target === dataAttributeValue && typeof onClose === 'function')
      onClose();
  };

  return (
    <section
      {...rest}
      data-widget={dataAttributeValue}
      style={containerStyles}
      onClick={onClickToClose}
    >
      {children}
    </section>
  );
};

interface LightboxBodyProps {
  children: React.ReactNode;
}

const LightboxBody = ({ children }: LightboxBodyProps) => {
  return (
    <div className="lightbox-body" style={bodyStyles}>
      {children}
    </div>
  );
};

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Lightbox = ({
  open,
  onClose,
  children,
  ...rest
}: LightboxProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);
  return (
    <ToggleVisibility open={open}>
      <LightboxContainer {...rest} onClose={onClose}>
        <LightboxBody>{children}</LightboxBody>
      </LightboxContainer>
    </ToggleVisibility>
  );
};
