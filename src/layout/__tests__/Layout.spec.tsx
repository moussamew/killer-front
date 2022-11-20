import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { Layout } from '@/layout/Layout';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<Layout />', () => {
  it('should show the user settings when current player click on settings icon', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <Layout>
          <div>Hello</div>
        </Layout>
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByTitle('userSettings'));

    expect(screen.getByText('User Settings')).toBeInTheDocument();
  });
});
