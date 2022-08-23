import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { ErrorMessage } from '../ErrorMessage';

const dummyProps = {
  message: 'There is an error',
  closeMessage: () => {},
};

describe('<ErrorMessage />', () => {
  it('should show the error message', () => {
    render(<ErrorMessage {...dummyProps} />);

    expect(screen.getByText('There is an error')).toBeInTheDocument();
  });

  it('should execute closeMessage when the close icon is clicked', async () => {
    const spyCloseMessage = vi.fn();

    render(<ErrorMessage {...dummyProps} closeMessage={spyCloseMessage} />);

    await userEvent.click(screen.getByAltText('closeErrorMessage'));

    expect(spyCloseMessage).toHaveBeenCalledTimes(1);
  });
});
