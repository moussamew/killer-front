import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { RoomErrorCode } from '@/constants/errors';
import { HomePage } from '@/pages/Home';
import { JoinRoomPage } from '@/pages/JoinRoom';
import { NotFoundPage } from '@/pages/NotFound';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<NotFoundPage />', () => {
  it('should redirect the player to the home page if wanted', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/join/errorCode']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join/:roomCode" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Oops, something goes wrong!');

    await userEvent.click(screen.getByText('Go back to home page'));

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Go back to home page')).not.toBeInTheDocument();
  });

  it.skip('should display an error message if needed', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: null })),
      ),
      rest.patch(PLAYER_ENDPOINT, (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: RoomErrorCode.BAD_ROOMCODE,
            message:
              'The roomCode need to be provided with a correct format (5 characters).',
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter initialEntries={['/join/X7JK']}>
        <Routes>
          <Route path="/join/:roomCode" element={<JoinRoomPage />} />
          <Route path="/room/:roomCode/error" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Oops, something goes wrong!');

    expect(
      await screen.findByText(
        'Reason: The roomCode need to be provided with a correct format (5 characters).',
      ),
    ).toBeInTheDocument();
  });
});
