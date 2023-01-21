import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { vi } from 'vitest';

import { AppRoutes } from '@/app/routes';
import {
  JOIN_ROOM_ROUTE,
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '@/constants/endpoints';
import { playerInPendingRoom } from '@/tests/mocks/players';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { server } from '@/tests/server';
import { renderWithRouter } from '@/tests/utils';

describe('<ShareRoomLink />', () => {
  beforeEach(() => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playerInPendingRoom)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );
  });

  it('should share the room link with navigator share if exists when the user click on the share button', async () => {
    const spyNavigatorShare = vi.fn();

    Object.defineProperty(window, 'navigator', {
      value: { share: spyNavigatorShare },
      writable: true,
    });

    renderWithRouter(<AppRoutes />, { route: `/room/${roomCode}` });

    await screen.findByText('Share link to join the room');

    await userEvent.click(screen.getByText('Share link to join the room'));

    expect(spyNavigatorShare).toHaveBeenCalledTimes(1);
    expect(spyNavigatorShare).toHaveBeenCalledWith({
      title: 'Killerparty',
      text: 'Hey! Join my party and try to kill me ^^',
      url: `${JOIN_ROOM_ROUTE}/${roomCode}`,
    });
  });

  it('should show error if the clipboard is not available', async () => {
    const errorMessage =
      'Cannot copy the link natively. Please copy it manually.';

    Object.defineProperty(window, 'navigator', {
      value: { share: null, clipboard: null },
      writable: true,
    });

    renderWithRouter(<AppRoutes />, { route: `/room/${roomCode}` });

    await screen.findByText('Share link to join the room');

    await userEvent.click(screen.getByText('Share link to join the room'));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();

    await userEvent.click(screen.getByText(errorMessage));

    await waitForElementToBeRemoved(() => screen.queryByText(errorMessage));
  });

  it('should save the room link in clipboard if share is not available', async () => {
    const spyNavigatorClipboard = vi.fn().mockResolvedValue('');

    Object.defineProperty(window, 'navigator', {
      value: {
        share: null,
        clipboard: { writeText: spyNavigatorClipboard },
      },
      writable: true,
    });

    renderWithRouter(<AppRoutes />, { route: `/room/${roomCode}` });

    await screen.findByText('Share link to join the room');

    await userEvent.click(screen.getByText('Share link to join the room'));

    expect(
      await screen.findByText('Link saved in the clipboard!'),
    ).toBeInTheDocument();
    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      `${JOIN_ROOM_ROUTE}/${roomCode}`,
    );
  });

  it('should show error if the clipboard cant be performed', async () => {
    const spyNavigatorClipboard = vi.fn().mockRejectedValue('');

    Object.defineProperty(window, 'navigator', {
      value: {
        share: null,
        clipboard: { writeText: spyNavigatorClipboard },
      },
      writable: true,
    });

    renderWithRouter(<AppRoutes />, { route: `/room/${roomCode}` });

    await screen.findByText('Share link to join the room');

    await userEvent.click(screen.getByText('Share link to join the room'));

    expect(
      await screen.findByText(
        `Cannot copy the link natively. Please copy it manually.`,
      ),
    ).toBeInTheDocument();
    expect(spyNavigatorClipboard).toHaveBeenCalledTimes(1);
    expect(spyNavigatorClipboard).toHaveBeenCalledWith(
      `${JOIN_ROOM_ROUTE}/${roomCode}`,
    );
  });
});
