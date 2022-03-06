import { fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { createRef } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import {
  PLAYER_ENDPOINT,
  PLAYER_SESSION_ENDPOINT,
  ROOM_ENDPOINT,
} from '../../../constants';
import { server } from '../../../tools/server';
import { renderWithProviders } from '../../../tools/tests/utils';
import CreateRoom from '../CreateRoom';

const dummyProps = {
  inputPseudo: '',
  inputPseudoRef: createRef<HTMLInputElement>(),
};

describe('<CreateRoom />', () => {
  it('should show the create room button', async () => {
    renderWithProviders(
      <MemoryRouter>
        <CreateRoom {...dummyProps} />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Create new room')).toBeInTheDocument();
  });

  it('should create a new room and redirect to it for a player with session', async () => {
    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity' })),
      ),
      rest.post(ROOM_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ code: 'YZVB5' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<CreateRoom {...dummyProps} />} />
          <Route
            path="/room/YZVB5"
            element={<p>Welcome to the room YZVB5!</p>}
          />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Create new room');

    fireEvent.click(screen.getByText('Create new room'));

    expect(
      await screen.findByText('Welcome to the room YZVB5!'),
    ).toBeInTheDocument();
  });

  it('should create a new player with new room and redirect for a player without session', async () => {
    server.use(
      rest.post(ROOM_ENDPOINT, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ code: 'X7BHV' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<CreateRoom {...dummyProps} />} />
          <Route
            path="/room/X7BHV"
            element={<p>Welcome to the room X7BHV!</p>}
          />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('Create new room');

    fireEvent.click(screen.getByText('Create new room'));

    expect(
      await screen.findByText('Welcome to the room X7BHV!'),
    ).toBeInTheDocument();
  });

  it('should show error while creating new player session', async () => {
    jest.spyOn(console, 'error').mockImplementation();

    server.use(
      rest.post(PLAYER_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'PLAYER.FORBIDDEN.PSEUDO',
            message: 'name must be longer than or equal to 1 characters',
          }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <CreateRoom {...dummyProps} />
      </MemoryRouter>,
    );

    await screen.findByText('Create new room');

    fireEvent.click(screen.getByText('Create new room'));

    expect(
      await screen.findByText(
        'name must be longer than or equal to 1 characters',
      ),
    ).toBeInTheDocument();
  });

  it('should show error while creating new room', async () => {
    jest.spyOn(console, 'error').mockImplementation();

    server.use(
      rest.get(PLAYER_SESSION_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ name: 'Trinity' })),
      ),
      rest.post(ROOM_ENDPOINT, (_req, res, ctx) =>
        res(ctx.status(400), ctx.json({ errorCode: 'ROOM.INTERNAL.ERROR' })),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <CreateRoom {...dummyProps} />
      </MemoryRouter>,
    );

    await screen.findByText('Create new room');

    fireEvent.click(screen.getByText('Create new room'));

    expect(
      await screen.findByText(
        'An error has occured while creating a new room. Please retry later.',
      ),
    ).toBeInTheDocument();
  });

  it('should focus input when the user trigger an error', async () => {
    jest.spyOn(console, 'error').mockImplementation();

    server.use(
      rest.post(ROOM_ENDPOINT, (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({ errorCode: 'PLAYER.FORBIDDEN.NO_USER_SESSION' }),
        ),
      ),
    );

    renderWithProviders(
      <MemoryRouter>
        <CreateRoom {...dummyProps} />
        <input
          ref={dummyProps.inputPseudoRef}
          value="Morpheus"
          onChange={jest.fn()}
        />
      </MemoryRouter>,
    );

    await screen.findByText('Create new room');

    fireEvent.click(screen.getByText('Create new room'));

    expect(
      await screen.findByText(
        'An error has occured while creating a new room. Please retry later.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue('Morpheus')).toHaveFocus();
  });
});
