import { useTranslation } from '@killerparty/intl';
import Lottie from 'lottie-react';

import ContactLottie from '@/assets/lotties/contact.json';

import styles from './styles/index.module.css';

export function ContactPage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <Lottie className={styles.lottie} animationData={ContactLottie} />
      <h1>{t('contact.title')}</h1>
      <p>{t('contact.description')}</p>
      <a className={styles.contact} href={`mailto:${t('contact.email')}`}>
        {t('contact.email')}
      </a>
      <p>{t('contact.last.update')}</p>
    </div>
  );
}
