import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Button } from '../Button';

describe('<Button />', () => {
  it('should show the text inside the button', () => {
    render(<Button content="My Button" />);

    expect(screen.getByText('My Button')).toBeInTheDocument();
  });

  it('should execute the callback passed when the button is clicked', async () => {
    const spyCallback = vi.fn();

    render(<Button content="My Button" onClick={spyCallback} />);

    await userEvent.click(screen.getByText('My Button'));

    expect(spyCallback).toHaveBeenCalledTimes(1);
  });

  it('should not execute the callback passed in parameter when disabled is set tot rue', async () => {
    const spyCallback = vi.fn();

    render(<Button content="My Button" disabled onClick={spyCallback} />);

    await userEvent.click(screen.getByText('My Button'));

    expect(spyCallback).not.toHaveBeenCalled();
  });
});
