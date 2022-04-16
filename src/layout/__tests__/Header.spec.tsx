import { screen } from '@testing-library/react';
import { rest } from 'msw';

import Header from '../Header';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<Header />', () => {
  it('should render correctly Header with application title', async () => {
    renderWithProviders(<Header />);

    expect(await screen.findByText('Killer Party')).toBeInTheDocument();
  });

  it('should show the name of the current player stored in the session', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(<Header />);

    expect(await screen.findByText('Neo')).toBeInTheDocument();
  });
});
