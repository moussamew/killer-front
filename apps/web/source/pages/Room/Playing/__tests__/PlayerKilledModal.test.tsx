import { t } from '@killerparty/intl';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { PlayerStatus } from '@/services/player/constants';
import { playingRoom, roomCode } from '@/tests/mocks/rooms';
import { playingRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<PlayerKilledModal />', () => {
  it('should close killed modal when the user confirm his death', async () => {
    server.use(
      http.get(SESSION_ENDPOINT, () => HttpResponse.json(playingRoomSession)),
      http.get(`${ROOM_ENDPOINT}/${roomCode}`, () =>
        HttpResponse.json(playingRoom),
      ),
    );

    renderWithProviders({ route: `/room/${roomCode}` });

    await userEvent.click(await screen.findByText(t('room.killed.button')));

    server.use(
      http.get(SESSION_ENDPOINT, () =>
        HttpResponse.json({
          ...playingRoomSession,
          status: PlayerStatus.KILLED,
        }),
      ),
    );

    await userEvent.click(
      screen.getByText(t('room.player.killed.modal.confirm.button')),
    );

    expect(
      await screen.findByText(t('room.player.killed.title')),
    ).toBeInTheDocument();
  });
});
