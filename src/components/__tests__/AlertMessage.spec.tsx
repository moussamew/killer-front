import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { AlertMessage } from '../AlertMessage';

const dummyProps = {
  message: 'There is an error',
  closeMessage: () => {},
};

describe('<AlertMessage />', () => {
  it('should show the message', () => {
    render(<AlertMessage {...dummyProps} />);

    expect(screen.getByText('There is an error')).toBeInTheDocument();
  });

  it('should execute closeMessage when the close icon is clicked', () => {
    const spyCloseMessage = vi.fn();

    render(<AlertMessage {...dummyProps} closeMessage={spyCloseMessage} />);

    fireEvent.click(screen.getByAltText('closeAlertMessage'));

    expect(spyCloseMessage).toHaveBeenCalledTimes(1);
  });
});
