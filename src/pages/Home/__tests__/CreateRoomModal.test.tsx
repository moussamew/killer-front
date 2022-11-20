import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import { PLAYER_ENDPOINT } from '@/constants/endpoints';
import { HomePage } from '@/pages/Home';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { CreateRoomModal } from '../CreateRoomModal';

describe('<CreateRoomModal />', () => {
  it('should close modal after creating a room', async () => {
    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Create new room'));

    fireEvent.change(screen.getByPlaceholderText('Choose a pseudo'), {
      target: { value: 'Morpheus' },
    });

    fireEvent.click(screen.getByText('Create my room'));

    await waitForElementToBeRemoved(() => screen.queryByText('Create my room'));

    expect(screen.queryByText('Create my room')).not.toBeInTheDocument();
  });

  it('should show error message while creating new player with a new room', async () => {
    server.use(
      rest.post(PLAYER_ENDPOINT, async (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'PLAYER.ERROR',
            message:
              'Cannot create a room with your player name. Please use another name.',
          }),
        ),
      ),
    );

    renderWithProviders(<CreateRoomModal />);

    fireEvent.change(await screen.findByPlaceholderText('Choose a pseudo'), {
      target: { value: 'Morpheus' },
    });

    fireEvent.click(screen.getByText('Create my room'));

    expect(
      await screen.findByText(
        'Cannot create a room with your player name. Please use another name.',
      ),
    ).toBeInTheDocument();
  });
});
