import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { Layout } from '@/layout/Layout';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

import { JoinRoomButton } from '../JoinRoomButton';

const dummyProps = {
  inputPseudo: '',
  showInputErrorMessage: vi.fn(),
};

describe('<JoinRoomButton />', () => {
  it('should show the button to join a room', () => {
    render(<JoinRoomButton {...dummyProps} />);

    expect(screen.getByText('Join a room')).toBeInTheDocument();
  });

  it('should open the join room modal by clicking on join room if the user is authenticated', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <Layout>
          <JoinRoomButton {...dummyProps} />
        </Layout>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByText('Join a room'));

    expect(await screen.findByText('Join this room')).toBeInTheDocument();
  });
});
