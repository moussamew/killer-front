import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';
import { rest } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { adminSession, noRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<RoomSettingsModal />', () => {
  it('should be able to delete the room as admin', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(adminSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(t('room.welcome.title'));

    await userEvent.click(screen.getByTitle(t('tooltip.room.settings')));

    await userEvent.type(
      screen.getByPlaceholderText(t('room.delete.current.room.placeholder')),
      roomCode,
    );

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(noRoomSession)),
      ),
    );

    await userEvent.click(
      screen.getByText(t('room.delete.current.room.confirm.button')),
    );

    expect(await screen.findByText(t('home.title'))).toBeInTheDocument();
  });
});
