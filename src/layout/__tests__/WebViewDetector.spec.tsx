import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { TWITTER_WEBVIEW_URL, WebViewApp } from '@/constants/webview';
import { renderWithProviders } from '@/tests/utils';

import { WebViewDetector } from '../WebViewDetector';

const { Messenger, Instagram } = WebViewApp;

describe('<WebViewDetector />', () => {
  it('should render a message if in a webview', async () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: Messenger,
      writable: true,
    });

    renderWithProviders({
      component: (
        <WebViewDetector>
          <div />
        </WebViewDetector>
      ),
    });

    expect(
      await screen.findByText('Opened from Messenger'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Access to Killer Party from a third party app is restricted for game experience reasons.',
      ),
    ).toBeInTheDocument();
  });

  it('should show error if the clipboard is not available', async () => {
    const errorMessage =
      'Cannot copy the link natively. Please copy it manually.';

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

    renderWithProviders({
      component: (
        <WebViewDetector>
          <div />
        </WebViewDetector>
      ),
    });

    await userEvent.click(
      await screen.findByText('Save link in the clipboard'),
    );

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();

    await userEvent.click(screen.getByText(errorMessage));

    await waitForElementToBeRemoved(() => screen.queryByText(errorMessage));
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

    renderWithProviders({
      component: (
        <WebViewDetector>
          <div />
        </WebViewDetector>
      ),
    });

    await userEvent.click(
      await screen.findByText('Save link in the clipboard'),
    );

    expect(
      await screen.findByText('Link saved in the clipboard!'),
    ).toBeInTheDocument();
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

    renderWithProviders({
      component: (
        <WebViewDetector>
          <div />
        </WebViewDetector>
      ),
    });

    await userEvent.click(
      await screen.findByText('Save link in the clipboard'),
    );

    expect(
      await screen.findByText(
        'Cannot copy the link natively. Please copy it manually.',
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

    renderWithProviders({
      component: (
        <WebViewDetector>
          <div />
        </WebViewDetector>
      ),
    });

    expect(await screen.findByText('Opened from Twitter')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Access to Killer Party from a third party app is restricted for game experience reasons.',
      ),
    ).toBeInTheDocument();
  });
});
