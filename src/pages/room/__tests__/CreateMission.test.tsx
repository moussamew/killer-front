import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { vi } from 'vitest';

import { MISSION_ENDPOINT } from '@/constants/endpoints';
import { server } from '@/tests/server';

import CreateMission from '../CreateMission';

describe('<CreateMission />', () => {
  it('should add a new mission', async () => {
    const spyRefetchPlayerMission = vi.fn();

    render(<CreateMission refetchPlayerMissions={spyRefetchPlayerMission} />);

    fireEvent.change(
      screen.getByPlaceholderText('Make him drink his glass dry'),
      { target: { value: 'New mission' } },
    );

    fireEvent.click(screen.getByText('Add this mission in the room'));

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

    fireEvent.change(
      screen.getByPlaceholderText('Make him drink his glass dry'),
      { target: { value: 'New mission' } },
    );

    fireEvent.click(screen.getByText('Add this mission in the room'));

    expect(
      await screen.findByText(
        'Name must be longer than or equal to 1 characters',
      ),
    ).toBeInTheDocument();
  });
});
