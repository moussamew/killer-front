import { type ReactNode } from 'react';

import Close from '@/assets/icons/close.svg';
import { useTranslation } from '@/hooks/useTranslation';

import styles from './styles/Modal.module.css';

interface Props {
  children: ReactNode;
  closeModal: () => void;
}

export function Modal({ children, closeModal }: Props): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className={styles.content}>
      <div className={styles.modal}>
        <Close
          className={styles.icon}
          title={t('tooltip.close')}
          onClick={closeModal}
        />

        {children}
      </div>
    </div>
  );
}
