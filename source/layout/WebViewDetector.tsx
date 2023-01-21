import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import tw from 'twin.macro';

import { ReactComponent as MobileIcon } from '@/assets/icons/mobile.svg';
import Killerparty from '@/assets/images/killerparty.png';
import { Button } from '@/components/Button';
import { errorStyle, successStyle } from '@/constants/styles';
import { AppLogo, TWITTER_WEBVIEW_URL, WebViewApp } from '@/constants/webview';
import { t } from '@/helpers/translate';
import { useCreateNavigatorClipboard } from '@/services/common/mutations';

import { Layout } from './Layout';

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
      return void toast.error(t('common.link_error'), errorStyle);
    }

    return createNavigatorClipboard.mutateAsync(roomLink, {
      onSuccess: () => {
        toast.success(t('common.link_saved'), successStyle);
      },
      onError: () => {
        toast.error(t('common.link_error'), errorStyle);
      },
    });
  };

  return (
    <Layout>
      <Content>
        <WelcomeImage alt="welcome" src={Killerparty} />
        <h1>{t('layout.opened_from_webview', { webViewApp })}</h1>
        <Text>{t('layout.restricted_access')}</Text>
        <WebViewImage src={AppLogo[webViewApp]} />
        <h2>{t('layout.how_to_play')}</h2>
        <Text>{t('layout.click_button_bellow')}</Text>
        <Button
          content={t('layout.save_link')}
          icon={<MobileIcon />}
          onClick={saveLink}
        />
      </Content>
    </Layout>
  );
}
