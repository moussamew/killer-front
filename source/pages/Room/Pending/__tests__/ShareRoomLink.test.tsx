import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { vi } from 'vitest';

import {
  JOIN_ROOM_ROUTE,
  SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { fakeUserAgent } from '@/tests/mocks/navigator';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { pendingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<ShareRoomLink />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'navigator', {
      value: { userAgent: fakeUserAgent },
      writable: true,
    });
  });

  beforeEach(() => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );
  });

  it('should share the room link with navigator share if exists when the user click on the share button', async () => {
    const spyNavigatorShare = vi.fn();

    Object.defineProperty(window, 'navigator', {
      value: { ...window.navigator, share: spyNavigatorShare },
      writable: true,
    });

    renderWithProviders({ route: `/room/${roomCode}` });

    await userEvent.click(
      await screen.findByText('Partager le lien de la partie'),
    );

    expect(spyNavigatorShare).toHaveBeenCalledTimes(1);
    expect(spyNavigatorShare).toHaveBeenCalledWith({
      title: 'Killerparty',
      text: `Rejoignez la partie et essayer d'en sortir vivant`,
      url: `${JOIN_ROOM_ROUTE}/${roomCode}`,
    });
  });

  it('should show error if the clipboard is not available', async () => {
    Object.defineProperty(window, 'navigator', {
      value: { ...window.navigator, share: null, clipboard: null },
      writable: true,
    });

    renderWithProviders({ route: `/room/${roomCode}` });

    await userEvent.click(
      await screen.findByText('Partager le lien de la partie'),
    );

    await screen.findByText(
      'Impossible de copier le lien automatiquement, veuillez le copier manuellement.',
    );
  });

  it('should save the room link in clipboard if share is not available', async () => {
    const spyNavigatorClipboard = vi.fn().mockResolvedValue('');

    Object.defineProperty(window, 'navigator', {
      value: {
        ...window.navigator,
        share: null,
        clipboard: { writeText: spyNavigatorClipboard },
      },
      writable: true,
    });

    renderWithProviders({ route: `/room/${roomCode}` });

    await userEvent.click(
      await screen.findByText('Partager le lien de la partie'),
    );

    expect(await screen.findByText('Lien enregistré !')).toBeInTheDocument();
    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      `${JOIN_ROOM_ROUTE}/${roomCode}`,
    );
  });

  it('should show error if the clipboard cannot be performed', async () => {
    const spyNavigatorClipboard = vi.fn().mockRejectedValue('');

    Object.defineProperty(window, 'navigator', {
      value: {
        ...window.navigator,
        share: null,
        clipboard: { writeText: spyNavigatorClipboard },
      },
      writable: true,
    });

    renderWithProviders({ route: `/room/${roomCode}` });

    await userEvent.click(
      await screen.findByText('Partager le lien de la partie'),
    );

    const notification = await screen.findAllByText(
      `Impossible de copier le lien automatiquement, veuillez le copier manuellement.`,
    );

    expect(notification[1]).toBeInTheDocument();
    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      `${JOIN_ROOM_ROUTE}/${roomCode}`,
    );
  });
});
