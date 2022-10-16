import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

import Mobile from '@/assets/icons/mobile.svg';
import Killerparty from '@/assets/images/killerparty.png';
import { AlertMessage } from '@/components/AlertMessage';
import { Button } from '@/components/Button';
import { AppLogo, TWITTER_WEBVIEW_URL, WebViewApp } from '@/constants/webview';
import t from '@/helpers/translate';
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
  const [linkSaved, setLinkSaved] = useState('');
  const [linkWithoutClipboard, setLinkWithoutClipboard] = useState('');
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

  const saveLink = (): void => {
    const roomLink = window.location.href;

    if (!navigator.clipboard) {
      return setLinkWithoutClipboard(
        t('common.link_without_clipboard', { roomLink }),
      );
    }

    return createNavigatorClipboard.mutate(roomLink, {
      onSuccess: () => setLinkSaved(t('common.link_saved')),
      onError: () =>
        setLinkWithoutClipboard(
          t('common.link_without_clipboard', { roomLink }),
        ),
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
        <Text>
          {t(
            linkSaved
              ? 'layout.link_saved_explanation'
              : 'layout.click_button_bellow',
          )}
        </Text>
        <Button
          content={linkSaved || t('layout.save_link')}
          icon={Mobile}
          onClick={saveLink}
        />
        {linkWithoutClipboard && (
          <AlertMessage message={linkWithoutClipboard} />
        )}
      </Content>
    </Layout>
  );
}
