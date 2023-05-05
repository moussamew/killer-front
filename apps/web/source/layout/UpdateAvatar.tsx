import { useTranslation } from '@killerparty/intl';

import { Gallery } from '@/components/Gallery';

import styles from './styles/UpdateAvatar.module.css';

export function UpdateAvatar(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div>
      <p className={styles.text}>{t('layout.user.update.avatar.label')}</p>
      <Gallery />
    </div>
  );
}
