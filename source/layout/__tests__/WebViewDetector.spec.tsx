import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { TWITTER_WEBVIEW_URL, WebViewApp } from '@/constants/webview';
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
      await screen.findByText(
        `L'accès à Killer Party depuis une application tierce est limité pour des raisons d'expérience de jeu.`,
      ),
    ).toBeInTheDocument();
  });

  it('should show error if the clipboard is not available', async () => {
    Object.defineProperties(window, {
      navigator: {
        value: {
          clipboard: null,
          userAgent: Instagram,
        },
        writable: true,
      },
    });

    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://killerparty.com/join/P9LDG',
      },
      writable: true,
    });

    renderWithProviders();

    await userEvent.click(await screen.findByText('Enregistrer le lien'));

    expect(
      await screen.findByText(
        'Impossible de copier le lien automatiquement, veuillez le copier manuellement.',
      ),
    ).toBeInTheDocument();
  });

  it('should save the link in the clipboard if available', async () => {
    const spyNavigatorClipboard = vi.fn().mockResolvedValue('');

    Object.defineProperties(window, {
      navigator: {
        value: {
          clipboard: { writeText: spyNavigatorClipboard },
          userAgent: Instagram,
        },
        writable: true,
      },
    });

    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://killerparty.com/join/P9LDG',
      },
      writable: true,
    });

    renderWithProviders();

    await userEvent.click(await screen.findByText('Enregistrer le lien'));

    expect(await screen.findByText('Lien enregistré !')).toBeInTheDocument();
    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      'https://killerparty.com/join/P9LDG',
    );
  });

  it('should show error if the clipboard saving cannot be performed', async () => {
    const spyNavigatorClipboard = vi.fn().mockRejectedValue('');

    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: { writeText: spyNavigatorClipboard },
        userAgent: Instagram,
      },
      writable: true,
    });

    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://killerparty.com/join/P9LDG',
      },
      writable: true,
    });

    renderWithProviders();

    await userEvent.click(await screen.findByText('Enregistrer le lien'));

    const notification = await screen.findAllByText(
      `Impossible de copier le lien automatiquement, veuillez le copier manuellement.`,
    );

    expect(notification[1]).toBeInTheDocument();
    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      'https://killerparty.com/join/P9LDG',
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
