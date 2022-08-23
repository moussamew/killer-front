import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { vi } from 'vitest';

import { MISSION_ENDPOINT } from '@/constants/endpoints';
import { CreateMission } from '@/pages/room/pending/CreateMission';
import { server } from '@/tests/server';

describe('<CreateMission />', () => {
  it('should add a new mission', async () => {
    const spyRefetchPlayerMission = vi.fn();

    render(<CreateMission refetchPlayerMissions={spyRefetchPlayerMission} />);

    await userEvent.type(
      screen.getByPlaceholderText('Make him drink his glass dry'),
      'New mission',
    );

    await userEvent.click(screen.getByText('Add this mission in the room'));

    await waitForElementToBeRemoved(() =>
      screen.queryByDisplayValue('New mission'),
    );

    expect(spyRefetchPlayerMission).toHaveBeenCalledTimes(1);
  });

  it('should show error message when adding a new mission has failed', async () => {
    server.use(
      rest.post(MISSION_ENDPOINT, async (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'MISSION.BAD_MISSION',
            message: 'Name must be longer than or equal to 1 characters',
          }),
        ),
      ),
    );

    const spyRefetchPlayerMission = vi.fn();

    render(<CreateMission refetchPlayerMissions={spyRefetchPlayerMission} />);

    await userEvent.type(
      screen.getByPlaceholderText('Make him drink his glass dry'),
      'New mission',
    );

    await userEvent.click(screen.getByText('Add this mission in the room'));

    expect(
      await screen.findByText(
        'Name must be longer than or equal to 1 characters',
      ),
    ).toBeInTheDocument();
  });

  it('should show error message when adding a new mission has failed', async () => {
    server.use(
      rest.post(MISSION_ENDPOINT, async (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'MISSION.BAD_MISSION',
            message: 'Name must be longer than or equal to 1 characters',
          }),
        ),
      ),
    );

    const spyRefetchPlayerMission = vi.fn();

    render(<CreateMission refetchPlayerMissions={spyRefetchPlayerMission} />);

    await userEvent.type(
      screen.getByPlaceholderText('Make him drink his glass dry'),
      'New mission',
    );

    await userEvent.click(screen.getByText('Add this mission in the room'));

    expect(
      await screen.findByText(
        'Name must be longer than or equal to 1 characters',
      ),
    ).toBeInTheDocument();
  });

  it('should let the user close error message if showed', async () => {
    server.use(
      rest.post(MISSION_ENDPOINT, async (_req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            errorCode: 'MISSION.BAD_MISSION',
            message: 'Name must be longer than or equal to 1 characters',
          }),
        ),
      ),
    );

    const spyRefetchPlayerMission = vi.fn();

    render(<CreateMission refetchPlayerMissions={spyRefetchPlayerMission} />);

    await userEvent.type(
      screen.getByPlaceholderText('Make him drink his glass dry'),
      'New mission',
    );

    await userEvent.click(screen.getByText('Add this mission in the room'));

    await screen.findByText(
      'Name must be longer than or equal to 1 characters',
    );

    await userEvent.click(screen.getByAltText('closeErrorMessage'));

    expect(
      screen.queryByText(
        'An error has occured while creating a new room. Please retry later.',
      ),
    ).not.toBeInTheDocument();
  });
});
