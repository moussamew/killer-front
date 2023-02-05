import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { PLAYER_ENDPOINT, SESSION_ENDPOINT } from '@/constants/endpoints';
import { fakePlayerOne } from '@/tests/mocks/players';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import { CreateRoomModal } from '../CreateRoomModal';

describe('<CreateRoomModal />', () => {
  it('should close modal after creating a new room', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(null)),
      ),
    );

    renderWithProviders();

    await screen.findByText('Ça vous tente un petit meurtre entre amis ?');

    await userEvent.click(screen.getByText('Créer une nouvelle partie'));

    await userEvent.type(
      screen.getByPlaceholderText('Choisir un nom'),
      fakePlayerOne.name,
    );

    await userEvent.click(screen.getByText('Créer ma partie'));

    await waitForElementToBeRemoved(() =>
      screen.queryByText('Créer ma partie'),
    );

    expect(screen.queryByText('Créer ma partie')).not.toBeInTheDocument();
  });

  it.skip('should show error message while creating new player with a new room', async () => {
    server.use(
      rest.post(PLAYER_ENDPOINT, async (_, res, ctx) =>
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

    renderWithProviders({ component: <CreateRoomModal /> });

    await userEvent.type(
      screen.getByPlaceholderText('Choose a pseudo'),
      'Morpheus',
    );

    await userEvent.click(screen.getByText('Create my room'));

    expect(
      await screen.findByText(
        'Cannot create a room with your player name. Please use another name.',
      ),
    ).toBeInTheDocument();
  });
});
