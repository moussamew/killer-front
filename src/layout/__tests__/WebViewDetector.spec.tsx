import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { TWITTER_WEBVIEW_URL, WebViewApp } from '@/constants/webview';
import { renderWithProviders } from '@/tests/utils';

import { WebViewDetector } from '../WebViewDetector';

const { Messenger, Instagram } = WebViewApp;

describe('<WebViewDetector />', () => {
  it('should render children if not in a webview', async () => {
    renderWithProviders(
      <MemoryRouter>
        <WebViewDetector>
          <p>Children!</p>
        </WebViewDetector>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Children!')).toBeInTheDocument();
  });

  it('should render a message if in a webview', async () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: Messenger,
      writable: true,
    });

    renderWithProviders(
      <MemoryRouter>
        <WebViewDetector>
          <p>Children!</p>
        </WebViewDetector>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText('Opened from Messenger'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Access to Killer Party from a third party app is restricted for game experience reasons.',
      ),
    ).toBeInTheDocument();
  });

  it('should show directly the room link if the clipboard is not available', async () => {
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

    renderWithProviders(
      <MemoryRouter>
        <WebViewDetector>
          <p>Children!</p>
        </WebViewDetector>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Save link in the clipboard'));

    expect(
      await screen.findByText(
        'Copy and paste the following link: https://killerparty.com/join/P9LDG',
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

    renderWithProviders(
      <MemoryRouter>
        <WebViewDetector>
          <p>Children!</p>
        </WebViewDetector>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Save link in the clipboard'));

    expect(
      await screen.findByText('Link saved in the clipboard!'),
    ).toBeInTheDocument();
    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      'https://killerparty.com/join/P9LDG',
    );
  });

  it('should show directly the room link if the clipboard saving cannot be performed', async () => {
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

    renderWithProviders(
      <MemoryRouter>
        <WebViewDetector>
          <p>Children!</p>
        </WebViewDetector>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Save link in the clipboard'));

    expect(
      await screen.findByText(
        'Copy and paste the following link: https://killerparty.com/join/P9LDG',
      ),
    ).toBeInTheDocument();
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

    renderWithProviders(
      <MemoryRouter>
        <WebViewDetector>
          <p>Children!</p>
        </WebViewDetector>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Opened from Twitter')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Access to Killer Party from a third party app is restricted for game experience reasons.',
      ),
    ).toBeInTheDocument();
  });
});
