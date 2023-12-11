import { useTranslation } from '@killerparty/intl';

import styles from './styles/index.module.css';

export function PrivacyPage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <h1>{t('privacy.policy.title')}</h1>
      <p>{t('privacy.policy.description')}</p>
      <h2>{t('privacy.policy.information.title')}</h2>
      <p>{t('privacy.policy.information.description')}</p>
      <p>
        <strong>
          {t('privacy.policy.information.description.first.item.subtitle')}
        </strong>
        &nbsp;
        {t('privacy.policy.information.description.first.item.description')}
      </p>
      <p>
        <strong>
          {t('privacy.policy.information.description.second.item.subtitle')}
        </strong>
        &nbsp;
        {t('privacy.policy.information.description.second.item.description')}
      </p>
      <h2>{t('privacy.policy.information.usage.title')}</h2>
      <p>{t('privacy.policy.information.usage.description')}</p>
      <ul className={styles.list}>
        <li>{t('privacy.policy.information.usage.first.item.description')}</li>
        <li>{t('privacy.policy.information.usage.second.item.description')}</li>
        <li>{t('privacy.policy.information.usage.third.item.description')}</li>
        <li>{t('privacy.policy.information.usage.fourth.item.description')}</li>
      </ul>
      <h2>{t('privacy.policy.information.share.title')}</h2>
      <p>{t('privacy.policy.information.share.description')}</p>
      <ul className={styles.list}>
        <li>{t('privacy.policy.information.share.first.item.description')}</li>
        <li>{t('privacy.policy.information.share.second.item.description')}</li>
        <li>{t('privacy.policy.information.share.third.item.description')}</li>
      </ul>
      <h2>{t('privacy.policy.security.title')}</h2>
      <p>{t('privacy.policy.security.description')}</p>
      <h2>{t('privacy.policy.confidential.edition.title')}</h2>
      <p>{t('privacy.policy.confidential.edition.description')}</p>
      <h2>{t('privacy.policy.contact.title')}</h2>
      <p>
        {t('privacy.policy.contact.description')}&nbsp;
        <strong>{t('contact.email')}</strong>.
      </p>
      <p>{t('privacy.policy.terms.validation')}</p>
      <p>{t('privacy.policy.last.update')}</p>
    </div>
  );
}
