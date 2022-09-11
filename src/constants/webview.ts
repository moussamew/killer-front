import InstagramLogo from '@/assets/images/instagram.png';
import MessengerLogo from '@/assets/images/messenger.png';

export enum WebViewApp {
  Messenger = 'Messenger',
  Instagram = 'Instagram',
}

export const AppLogo: Record<string, string> = {
  Messenger: MessengerLogo,
  Instagram: InstagramLogo,
};
