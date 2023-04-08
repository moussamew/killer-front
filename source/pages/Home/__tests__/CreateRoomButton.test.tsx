import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18next';
import { rest } from 'msw';

import { SESSION_ENDPOINT, ROOM_ENDPOINT } from '@/constants/endpoints';
import { pendingRoom, roomCode } from '@/tests/mocks/rooms';
import { pendingRoomSession, noRoomSession } from '@/tests/mocks/sessions';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

describe('<CreateRoomButton />', () => {
  it('should open a room creation modal if the user does not have a session', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(null)),
      ),
    );

    renderWithProviders();

    await screen.findByText(t('home.title'));

    await userEvent.click(screen.getByText(t('home.create.room.button')));

    expect(screen.getByText(t('home.create.pseudo.label'))).toBeInTheDocument();
    expect(
      screen.getByText(t('home.create.room.confirm.button')),
    ).toBeInTheDocument();
  });

  it.skip('should create a new room and redirect to it for a player with session', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(noRoomSession)),
      ),
      rest.post(ROOM_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    renderWithProviders();

    await screen.findByText(noRoomSession.name);

    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoomSession)),
      ),
      rest.get(`${ROOM_ENDPOINT}/${pendingRoom.code}`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(pendingRoom)),
      ),
    );

    await userEvent.click(screen.getByText(t('home.create.room.button')));

    expect(
      await screen.findByText(t('room.join.room.code', { roomCode })),
    ).toBeInTheDocument();
  });

  it.skip('should show error message when there is an error while creating a new room', async () => {
    server.use(
      rest.get(SESSION_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity', roomCode: null })),
      ),
      rest.post(ROOM_ENDPOINT, (_, res, ctx) =>
        res(ctx.status(400), ctx.json({ errorCode: 'ROOM.ERROR' })),
      ),
    );

    renderWithProviders();

    await screen.findByText('Trinity');

    await userEvent.click(screen.getByText('Create new room'));

    expect(
      await screen.findByText(
        'An error has occured while creating a new room. Please retry later.',
      ),
    ).toBeInTheDocument();
  });
});
