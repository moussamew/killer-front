import { useTranslation } from '@/hooks/useTranslation';

import styles from './styles/Rules.module.css';

export function Rules(): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.step}>
        <span className={styles.number}>1.</span>
        <div>
          <h2>{t('home.first.rule.title')}</h2>
          <p>{t('home.first.rule.text')}</p>
        </div>
      </div>
      <div className={styles.step}>
        <span className={styles.number}>2.</span>
        <div>
          <h2>{t('home.second.rule.title')}</h2>
          <p>{t('home.second.rule.text')}</p>
        </div>
      </div>
      <div className={styles.step}>
        <span className={styles.number}>3.</span>
        <div>
          <h2>{t('home.third.rule.title')}</h2>
          <p>{t('home.third.rule.text')}</p>
        </div>
      </div>
    </>
  );
}
