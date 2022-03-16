import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';

import { PLAYER_SESSION_ENDPOINT } from 'constants/endpoints';
import { server } from 'tools/server';
import { renderWithProviders } from 'tools/tests/utils';

import Layout from '../Layout';

describe('<Layout />', () => {
  it('should render correctly Layout with application title', async () => {
    renderWithProviders(
      <Layout>
        <div />
      </Layout>,
    );

    expect(await screen.findByText('Killer Party')).toBeInTheDocument();
  });

  it('should show the name of the current player stored in the session', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(
      <Layout>
        <div />
      </Layout>,
    );

    expect(await screen.findByText('Neo')).toBeInTheDocument();
  });

  it('should show the modal settings when current player click on settings icon', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(
      <Layout>
        <div />
      </Layout>,
    );

    await screen.findByAltText('settings');

    fireEvent.click(screen.getByAltText('settings'));

    expect(screen.getByText('User Settings')).toBeInTheDocument();
  });

  it('should close modal settings by clicking on the cross icon', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Neo' })),
      ),
    );

    renderWithProviders(
      <Layout>
        <div />
      </Layout>,
    );

    await screen.findByAltText('settings');

    fireEvent.click(screen.getByAltText('settings'));
    fireEvent.click(screen.getByAltText('closeModal'));

    expect(screen.queryByText('User Settings')).not.toBeInTheDocument();
  });
});
