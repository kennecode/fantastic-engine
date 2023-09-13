import React from 'preact/compat';
import { ToggleVisibility } from 'src/components/ToggleVisibility';

interface LightboxContainerProps {
  onClose: () => void;
  children: React.ReactNode;
}

const LightboxContainer = ({ onClose, children }: LightboxContainerProps) => {
  const dataAttributeValue = 'lightbox-container';
  const onClickToClose = (e: any) => {
    const target = e.target.getAttribute('data-widget');
    if (target === dataAttributeValue && typeof onClose === 'function')
      onClose();
  };

  return (
    <div
      data-widget={dataAttributeValue}
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
      {children}
    </div>
  );
};

interface LightboxBodyProps {
  children: React.ReactNode;
}

const LightboxBody = ({ children }: LightboxBodyProps) => {
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
      {children}
    </div>
  );
};

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Lightbox = ({ open, onClose, children }: LightboxProps) => {
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
      <LightboxContainer onClose={onClose}>
        <LightboxBody>{children}</LightboxBody>
      </LightboxContainer>
    </ToggleVisibility>
  );
};
