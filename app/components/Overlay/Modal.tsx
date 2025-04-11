import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { css } from 'styled-system/css';

const Modal = ({ visible = true, onClose, children }: IModalProps) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    if (visible) {
      setOpenModal(true);
      document.body.style.overflow = 'hidden';
    } else {
      handleClose();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (typeof document === 'undefined') {
    return null;
  }

  const modalRoot = document.body;

  return createPortal(
    <div className={`${container} ${openModal ? openContainer : ''}`} onClick={handleClose}>
      <div className={`${content}  ${openModal ? opeContent : ''}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

const container = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease',
  zIndex: 1,
});

const openContainer = css({
  opacity: 1,
  pointerEvents: 'auto',
});

const opeContent = css({
  transform: 'translateY(0px) !important',
});

const content = css({
  width: '100%',
  maxWidth: '400px',
  padding: '20px',
  transform: 'translateY(100px)',
  transition: 'transform 0.3s ease',
});
