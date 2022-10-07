import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { vi } from 'vitest';

import { Button } from '../Button';

describe('<Button />', () => {
  it('should show the text inside the button', () => {
    const spyCallback = vi.fn();

    render(<Button content="My Button" onClick={spyCallback} />);

    expect(screen.getByText('My Button')).toBeInTheDocument();
  });

  it('should execute the callback passed when the button is clicked', () => {
    const spyCallback = vi.fn();

    render(<Button content="My Button" onClick={spyCallback} />);

    fireEvent.click(screen.getByText('My Button'));

    expect(spyCallback).toHaveBeenCalledTimes(1);
  });

  it('should not execute the callback passed in parameter when disabled is set to true', () => {
    const spyCallback = vi.fn();

    render(<Button content="My Button" disabled onClick={spyCallback} />);

    fireEvent.click(screen.getByText('My Button'));

    expect(spyCallback).not.toHaveBeenCalled();
  });

  it('should clean previous error message if the button is clicked again', async () => {
    const errorPromise = async (): Promise<void> =>
      Promise.reject(new Error('Error while processing'));
    const successPromise = async (): Promise<void> => Promise.resolve();

    const { rerender } = render(
      <Button content="My Button" onClick={errorPromise} />,
    );

    fireEvent.click(screen.getByText('My Button'));

    await screen.findByText('Error while processing');

    rerender(<Button content="My Button" onClick={successPromise} />);

    fireEvent.click(screen.getByText('My Button'));

    await waitForElementToBeRemoved(() =>
      screen.queryByText('Error while processing'),
    );

    expect(
      screen.queryByText('Error while processing'),
    ).not.toBeInTheDocument();
  });
});
