import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { PlayerRole } from '@/constants/enums';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { PendingRoomPage } from '..';
import { RoomPage } from '../..';
import { KickPlayerModal } from '../KickPlayerModal';

const dummyProps = {
  playerName: 'Morpheus',
  playerId: 1,
};

describe('<KickPlayerModal />', () => {
  it('should kick player from the room', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: 0,
            name: 'Neo',
            roomCode: 'X7VBD',
            role: PlayerRole.ADMIN,
          }),
        ),
      ),
      rest.get(`${ROOM_ENDPOINT}/X7VBD/players`, async (_req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            { id: 0, name: 'Neo' },
            { id: 1, name: 'Morpheus' },
          ]),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7VBD']}>
        <Routes>
          <Route
            path="/room/:roomCode"
            element={<RoomPage page={<PendingRoomPage />} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByAltText('kickMorpheus'));

    fireEvent.click(screen.getByText('Kick Morpheus'));

    await waitForElementToBeRemoved(() => screen.queryByText('Kick Morpheus'));

    expect(
      screen.queryByText('Kick players from the room'),
    ).not.toBeInTheDocument();
  });

  it('should let the user close error message if showed', async () => {
    server.use(
      rest.patch(
        `${ROOM_ENDPOINT}/X7VBD/player/1/admin`,
        async (_req, res, ctx) =>
          res(
            ctx.status(400),
            ctx.json({
              errorCode: 'ROOM.FORBIDDEN',
              message: 'Action is not allowed',
            }),
          ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/room/X7VBD']}>
        <Routes>
          <Route
            path="/room/:roomCode"
            element={<KickPlayerModal {...dummyProps} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Kick Morpheus'));

    await screen.findByText('Action is not allowed');

    fireEvent.click(await screen.findByAltText('closeErrorMessage'));

    expect(
      screen.queryByAltText('Action is not allowed'),
    ).not.toBeInTheDocument();
  });
});
