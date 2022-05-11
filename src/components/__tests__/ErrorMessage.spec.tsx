import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { ErrorMessage } from '../ErrorMessage';

const dummyProps = {
  errorMessage: 'There is an error',
  closeMessage: () => {},
};

describe('<ErrorMessage />', () => {
  it('should show the error message', () => {
    render(<ErrorMessage {...dummyProps} />);

    expect(screen.getByText('There is an error')).toBeInTheDocument();
  });

  it('should execute closeMessage when the close icon is clicked', () => {
    const spyCloseMessage = vi.fn();

    render(<ErrorMessage {...dummyProps} closeMessage={spyCloseMessage} />);

    fireEvent.click(screen.getByAltText('closeErrorMessage'));

    expect(spyCloseMessage).toHaveBeenCalledTimes(1);
  });
});
