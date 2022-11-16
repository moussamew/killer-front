import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { toast } from 'react-hot-toast';

import { Notification } from '../Notification';

describe('<Notification />', () => {
  it('should show a notification', () => {
    render(<Notification />);

    toast.success('This notification is a success!');

    expect(
      screen.getByText('This notification is a success!'),
    ).toBeInTheDocument();
  });

  it('should dismiss a notification', async () => {
    render(<Notification />);

    toast.error('This notification is an error!');

    fireEvent.click(screen.getByText('This notification is an error!'));

    await waitForElementToBeRemoved(() =>
      screen.queryByText('This notification is an error!'),
    );

    expect(
      screen.queryByText('This notification is an error!'),
    ).not.toBeInTheDocument();
  });
});
