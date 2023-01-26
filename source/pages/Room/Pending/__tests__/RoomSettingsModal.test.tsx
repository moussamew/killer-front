import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    await screen.findByText('Bienvenue à la fête !');

    await userEvent.click(screen.getByTitle('roomSettings'));

    await userEvent.type(
      screen.getByPlaceholderText(
        /Confirmez en saisissant le code de la partie/,
      ),
      roomCode,
    );

    await userEvent.click(screen.getByText('Supprimer'));

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(noRoomSession)),
      ),
    );

    expect(
      await screen.findByText('La bonne manière de tuer vos amis..'),
    ).toBeInTheDocument();
  });
});
