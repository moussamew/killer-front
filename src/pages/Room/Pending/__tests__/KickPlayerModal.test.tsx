import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { RoomPage } from '@/pages/Room';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { adminPlayerSession } from '@/tests/mocks/playerSession';
import { pendingRoomWithMultiplePlayers, roomCode } from '@/tests/mocks/room';
import { roomPlayerMorpheus } from '@/tests/mocks/roomPlayer';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<KickPlayerModal />', () => {
  it('should kick player from the room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(adminPlayerSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${roomCode}`, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomWithMultiplePlayers)),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={[`/room/${roomCode}`]}>
        <Routes>
          <Route path="/room/:roomCode" element={<RoomPage />} />
          <Route path="/room/:roomCode/pending" element={<PendingRoomPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText(roomPlayerMorpheus.name);

    await userEvent.click(
      await screen.findByTitle(`kick${roomPlayerMorpheus.name}`),
    );

    await userEvent.click(screen.getByText(`Kick ${roomPlayerMorpheus.name}`));

    await waitForElementToBeRemoved(() =>
      screen.queryByText(`Kick ${roomPlayerMorpheus.name}`),
    );

    expect(
      screen.queryByText('Kick players from the room'),
    ).not.toBeInTheDocument();
  });
});
