import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import clsx from 'clsx';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import ArrowLeft from '../assets/icons/arrowLeft.svg';
import Close from '../assets/icons/close.svg';

import styles from './styles/FullScreenModal.module.css';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  hideBackButton?: boolean;
}

export function FullScreenModal({
  children,
  title,
  onClose,
  hideBackButton = true,
}: Props): JSX.Element {
  const navigate = useNavigate();

  useEffect(function disableBodyScrollOnModalOpen() {
    const body = document.querySelector('body');

    disableBodyScroll(body!);

    return () => enableBodyScroll(body!);
  });

  useEffect(function listenKeyboardEvent() {
    const closeModalOnEscape = (keyboardEvent: KeyboardEvent): void => {
      if (keyboardEvent.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeModalOnEscape);

    return () => document.removeEventListener('keydown', closeModalOnEscape);
  });

  const closeModalOnEnter = (
    keyboardEvent: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (keyboardEvent.code === 'Enter') {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.header}>
        <div
          role="button"
          tabIndex={0}
          className={clsx(styles.icon, { [styles.hidden]: hideBackButton })}
          onClick={() => navigate(-1)}
          onKeyDown={closeModalOnEnter}
          aria-label="Close Modal"
        >
          <ArrowLeft />
        </div>
        <h2>{title}</h2>
        <div
          role="button"
          tabIndex={0}
          className={styles.icon}
          onClick={onClose}
          onKeyDown={closeModalOnEnter}
          aria-label="Close Modal"
        >
          <Close />
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>,
    document.getElementById('modal')!,
  );
}
