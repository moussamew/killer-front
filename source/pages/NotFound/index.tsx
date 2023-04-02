import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import NotFoundSrc from '@/assets/images/not-found.jpg';
import { Button } from '@/components/Button';

import styles from './styles/index.module.css';

export function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();
  const { state: errorMessage } = useLocation();
  const { t } = useTranslation();

  const handleGoBack = (): void => {
    navigate('/');
  };

  return (
    <>
      <div className={styles.infos}>
        <h1>{t('notfound.title')}</h1>
        <p>{t('notfound.description')}</p>
        {errorMessage && (
          <p>{t('notfound.reason', { reason: errorMessage })}</p>
        )}
      </div>
      <img alt="notFound" className={styles.image} src={NotFoundSrc} />
      <Button color="primary" onClick={handleGoBack}>
        {t('notfound.back')}
      </Button>
    </>
  );
}
