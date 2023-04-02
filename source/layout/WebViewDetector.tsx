import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button';
import { AppLogo, TWITTER_WEBVIEW_URL, WebViewApp } from '@/constants/webview';
import { useCreateNavigatorClipboard } from '@/services/common/mutations';

import styles from './styles/WebViewDetector.module.css';

const { Instagram, Messenger, Twitter } = WebViewApp;

interface Props {
  children: JSX.Element;
}

export function WebViewDetector({ children }: Props): JSX.Element {
  const { t } = useTranslation();
  const [webViewApp, setWebViewApp] = useState('');
  const { createNavigatorClipboard } = useCreateNavigatorClipboard();

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
    const roomLink = window.location.href;

    if (!navigator.clipboard) {
      return void toast.error(t('notification.link.saved.error'));
    }

    return createNavigatorClipboard.mutateAsync(roomLink, {
      onSuccess: () => {
        toast.success(t('notification.link.saved.success'));
      },
      onError: () => {
        toast.error(t('notification.link.saved.error'));
      },
    });
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
