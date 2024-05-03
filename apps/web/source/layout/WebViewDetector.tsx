import { useTranslation } from '@killerparty/intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import { AppLogo, TWITTER_WEBVIEW_URL, WebViewApp } from '@/constants/webview';

import styles from './styles/WebViewDetector.module.css';

const { Instagram, Messenger, Twitter } = WebViewApp;

interface Props {
  children: JSX.Element;
}

export function WebViewDetector({ children }: Props): JSX.Element {
  const { t } = useTranslation();
  const [webViewApp, setWebViewApp] = useState('');

  useEffect(() => {
    [Instagram, Messenger].forEach((app) => {
      if (navigator.userAgent.includes(app)) {
        setWebViewApp(app);
      }
    });

    if (document.referrer.startsWith(TWITTER_WEBVIEW_URL)) {
      setWebViewApp(Twitter);
    }
  }, []);

  if (!webViewApp) {
    return children;
  }

  const saveLink = async (): Promise<void> => {
    await navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success(t('notification.link.saved.success')))
      .catch(() => toast.error(t('notification.link.saved.error')));
  };

  return (
    <div className={styles.content}>
      <h1>{t('webview.title', { webViewApp })}</h1>
      <p>{t('webview.restriction.message')}</p>
      <img
        alt="application logo"
        className={styles.appLogo}
        src={AppLogo[webViewApp]}
      />
      <h2>{t('webview.how.to.play')}</h2>
      <p>{t('webview.click.button.message')}</p>
      <Button color="primary" onClick={saveLink}>
        {t('webview.save.link.button')}
      </Button>
    </div>
  );
}
