import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
} from '@/constants/endpoints';
import { RoomErrorCode } from '@/constants/errors';
import { HomePage } from '@/pages/home';
import { JoinRoomPage } from '@/pages/joinRoom';
import { NotFoundPage } from '@/pages/notFound';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<NotFoundPage />', () => {
  it('should redirect the player to home page when the button is clicked', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/join/unknownRoomCode']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join/unknownRoomCode" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Oops, something goes wrong!');

    fireEvent.click(screen.getByText('Go back to home page'));

    expect(
      await screen.findByText('The right way to kill your friends..'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Go back to home page')).not.toBeInTheDocument();
  });

  it('should display an error message if needed', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo', roomCode: null })),
      ),
      rest.patch(PLAYER_ENDPOINT, (_req, res, ctx) =>
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
