import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-hot-toast';

import { Notification } from '../Notification';

describe.skip('<Notification />', () => {
  it('should show a notification', async () => {
    render(<Notification />);

    toast.success('This notification is a success!');

    expect(
      await screen.findByText('This notification is a success!'),
    ).toBeInTheDocument();
  });

  it('should dismiss a notification', async () => {
    render(<Notification />);

    toast.error('This notification is an error!');

    await userEvent.click(
      await screen.findByText('This notification is an error!'),
    );

    await waitForElementToBeRemoved(() =>
      screen.queryByText('This notification is an error!'),
    );

    expect(
      screen.queryByText('This notification is an error!'),
    ).not.toBeInTheDocument();
  });
});
