import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';

import { TWITTER_WEBVIEW_URL, WebViewApp } from '@/constants/webview';
import { roomCode } from '@/tests/mocks/rooms';
import { renderWithProviders } from '@/tests/render';

const { Messenger, Instagram } = WebViewApp;

describe('<WebViewDetector />', () => {
  it('should prevents the application to be accessible if the user open it from a webview', async () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: Messenger,
      writable: true,
    });

    renderWithProviders();

    expect(
      await screen.findByText(t('webview.restriction.message')),
    ).toBeInTheDocument();
  });

  it('should save the link in the clipboard', async () => {
    const spyNavigatorClipboard = jest.fn().mockResolvedValue('');

    Object.defineProperties(window, {
      navigator: {
        value: {
          clipboard: { writeText: spyNavigatorClipboard },
          userAgent: Instagram,
        },
        writable: true,
      },
    });

    renderWithProviders({ route: `/join/${roomCode}` });

    await userEvent.click(
      await screen.findByText(t('webview.save.link.button')),
    );

    expect(
      await screen.findByText(t('notification.link.saved.success')),
    ).toBeInTheDocument();
    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      `http://localhost/join/${roomCode}`,
    );
  });

  it('should show error if the clipboard saving cannot be performed', async () => {
    const spyNavigatorClipboard = jest.fn().mockRejectedValue('');

    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: { writeText: spyNavigatorClipboard },
        userAgent: Instagram,
      },
      writable: true,
    });

    renderWithProviders({ route: `/join/${roomCode}` });

    await userEvent.click(
      await screen.findByText(t('webview.save.link.button')),
    );

    await screen.findByText(t('notification.link.saved.error'));

    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      `http://localhost/join/${roomCode}`,
    );
  });

  it('should detect Twitter webview', async () => {
    Object.defineProperty(document, 'referrer', {
      value: TWITTER_WEBVIEW_URL,
      writable: true,
    });

    renderWithProviders();

    expect(
      await screen.findByText('Ouvert depuis Twitter'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `L'accès à Killer Party depuis une application tierce est limité pour des raisons d'expérience de jeu.`,
      ),
    ).toBeInTheDocument();
  });
});
