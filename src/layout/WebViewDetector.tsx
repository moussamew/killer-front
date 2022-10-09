import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Mobile from '@/assets/icons/mobile.svg';
import Killerparty from '@/assets/images/killerparty.png';
import { AlertMessage } from '@/components/AlertMessage';
import { Button } from '@/components/Button';
import { AppLogo, WebViewApp } from '@/constants/webview';
import t from '@/helpers/translate';

import { Layout } from './Layout';

const { Instagram, Messenger } = WebViewApp;

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
  const [webViewApp, setWebViewApp] = useState<string | null>(null);
  const [linkSaved, setLinkSaved] = useState<string | null>(null);
  const [linkWithoutClipboard, setLinkWithoutClipboard] = useState<
    string | null
  >(null);

  const navigate = useNavigate();

  useEffect(() => {
    [Instagram, Messenger].forEach((app) => {
      if (navigator.userAgent.includes(app)) {
        setWebViewApp(app);
      }
    });
  }, [navigate]);

  if (!webViewApp) {
    return children;
  }

  const saveLink = async (): Promise<void> => {
    if (!navigator.clipboard) {
      return setLinkWithoutClipboard(
        t('common.link_without_clipboard', {
          link: window.location.href,
        }),
      );
    }

    return navigator.clipboard
      .writeText(window.location.href)
      .then(() => setLinkSaved(t('common.link_saved')))
      .catch(() =>
        setLinkWithoutClipboard(
          t('common.link_without_clipboard', {
            link: window.location.href,
          }),
        ),
      );
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
