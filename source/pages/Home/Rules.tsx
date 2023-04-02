import { Trans, useTranslation } from 'react-i18next';

import styles from './styles/Rules.module.css';

export function Rules(): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.step}>
        <span className={styles.number}>1.</span>
        <div>
          <h2>{t('home.first.rule.title')}</h2>
          <p>
            <Trans t={t} i18nKey="home.first.rule.text" />
          </p>
        </div>
      </div>
      <div className={styles.step}>
        <span className={styles.number}>2.</span>
        <div>
          <h2>{t('home.second.rule.title')}</h2>
          <p>
            <Trans t={t} i18nKey="home.second.rule.text" />
          </p>
        </div>
      </div>
      <div className={styles.step}>
        <span className={styles.number}>3.</span>
        <div>
          <h2>{t('home.third.rule.title')}</h2>
          <p>
            <Trans t={t} i18nKey="home.third.rule.text" />
          </p>
        </div>
      </div>
    </>
  );
}
