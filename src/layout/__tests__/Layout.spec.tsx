import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';

import Layout from '../Layout';

import { PLAYER_SESSION_ENDPOINT } from '@/constants/endpoints';
import { server } from '@/tests/server';
import { renderWithProviders } from '@/tests/utils';

describe('<Layout />', () => {
  it('should render correctly Layout with its children', async () => {
    renderWithProviders(
      <Layout>
        <div>Hello</div>
      </Layout>,
    );

    expect(await screen.findByText('Hello')).toBeInTheDocument();
  });

  it('should show the modal settings when current player click on settings icon', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(
      <Layout>
        <div>Hello</div>
      </Layout>,
    );

    await screen.findByAltText('settings');

    fireEvent.click(screen.getByAltText('settings'));

    expect(screen.getByText('User Settings')).toBeInTheDocument();
  });
});
