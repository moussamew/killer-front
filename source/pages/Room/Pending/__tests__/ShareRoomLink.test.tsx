import { screen, waitForElementToBeRemoved } from '@testing-library/react';
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
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

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
      value: { ...window.navigator, share: null, clipboard: null },
      writable: true,
    });

    renderWithProviders({ route: `/room/${roomCode}` });

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
        ...window.navigator,
        share: null,
        clipboard: { writeText: spyNavigatorClipboard },
      },
      writable: true,
    });

    renderWithProviders({ route: `/room/${roomCode}` });

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
        ...window.navigator,
        share: null,
        clipboard: { writeText: spyNavigatorClipboard },
      },
      writable: true,
    });

    renderWithProviders({ route: `/room/${roomCode}` });

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
