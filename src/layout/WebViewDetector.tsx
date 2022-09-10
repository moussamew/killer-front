import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import Killerparty from '@/assets/images/killerparty.png';
import { Button } from '@/components/Button';
import { AppLogo, WebViewApp } from '@/constants/webview';
import t from '@/helpers/translate';

import { Layout } from './Layout';

const { Instagram, Messenger, iPhone } = WebViewApp;

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

export const WebViewDetector = ({ children }: Props): JSX.Element => {
  const [webViewApp, setWebViewApp] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    [Instagram, Messenger, iPhone].forEach((app) => {
      if (navigator.userAgent.includes(app)) {
        setWebViewApp(app);
      }
    });
  }, [navigate]);

  if (!webViewApp) {
    return children;
  }

  return (
    <Layout>
      <Content>
        <WelcomeImage alt="welcome" src={Killerparty} />
        <h1>{t('layout.opened_from_webview', { webViewApp })}</h1>
        <Text>{t('layout.restricted_access')}</Text>
        <WebViewImage src={AppLogo[webViewApp]} />
        <h2>{t('layout.how_to_play')}</h2>
        <Text>{t('layout.click_button_bellow')}</Text>
        <Button content="Save the link in the clipboard" />
      </Content>
    </Layout>
  );
};
