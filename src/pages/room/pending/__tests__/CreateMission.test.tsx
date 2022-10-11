import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';

import { MISSION_ENDPOINT } from '@/constants/endpoints';
import { CreateMission } from '@/pages/room/pending/CreateMission';
import { server } from '@/tests/server';

describe('<CreateMission />', () => {
  it('should add a new mission', async () => {
    render(<CreateMission />);

    fireEvent.change(
      screen.getByPlaceholderText('Make him drink his glass dry'),
      { target: { value: 'New mission' } },
    );

    fireEvent.click(screen.getByText('Add this mission in the room'));

    await waitForElementToBeRemoved(() =>
      screen.queryByDisplayValue('New mission'),
    );
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

    render(<CreateMission />);

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

    render(<CreateMission />);

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
