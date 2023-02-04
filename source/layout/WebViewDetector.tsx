import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import tw from 'twin.macro';

import { ReactComponent as MobileIcon } from '@/assets/icons/mobile.svg';
import Killerparty from '@/assets/images/killerparty.png';
import { Button } from '@/components/Button';
import { errorStyle, successStyle } from '@/constants/styles';
import { AppLogo, TWITTER_WEBVIEW_URL, WebViewApp } from '@/constants/webview';
import { useTranslation } from '@/hooks/useTranslation';
import { useCreateNavigatorClipboard } from '@/services/common/mutations';

const { Instagram, Messenger, Twitter } = WebViewApp;

const Content = tw.div`
  text-center 
`;

const WelcomeImage = tw.img`
  m-auto
`;

const WebViewImage = tw.img`
  h-[8rem] m-auto my-2
`;

const Text = tw.p`
  mb-1
`;

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
      return void toast.error(t('notification.link.saved.error'), errorStyle);
    }

    return createNavigatorClipboard.mutateAsync(roomLink, {
      onSuccess: () => {
        toast.success(t('notification.link.saved.success'), successStyle);
      },
      onError: () => {
        toast.error(t('notification.link.saved.error'), errorStyle);
      },
    });
  };

  return (
    <Content>
      <WelcomeImage alt="welcome" src={Killerparty} />
      <h1>{t('webview.title', { webViewApp })}</h1>
      <Text>{t('webview.restriction.message')}</Text>
      <WebViewImage src={AppLogo[webViewApp]} />
      <h2>{t('webview.how.to.play')}</h2>
      <Text>{t('webview.click.button.message')}</Text>
      <Button
        content={t('webview.save.link.button')}
        icon={<MobileIcon />}
        onClick={saveLink}
      />
    </Content>
  );
}
