import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { fakePlayerThree } from '@/tests/mocks/players';
import { playingRoom, roomCode } from '@/tests/mocks/rooms';
import { playingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<PlayerKilledButton />', () => {
  it('should open killed modal when the player click on killed button', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(playingRoom)),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await screen.findByText(
      t('room.target.to.kill', { pseudo: fakePlayerThree.name }),
    );

    await userEvent.click(screen.getByText(t('room.killed.button')));

    expect(
      await screen.findByText(t('room.player.killed.modal.title')),
    ).toBeInTheDocument();
  });
});
