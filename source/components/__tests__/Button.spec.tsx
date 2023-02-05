import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Button } from '../Button';

describe('<Button />', () => {
  it('should show the text inside the button', () => {
    const spyCallback = vi.fn();

    render(
      <Button color="primary" onClick={spyCallback}>
        Text
      </Button>,
    );

    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('should execute the callback passed when the button is clicked', async () => {
    const spyCallback = vi.fn();

    render(
      <Button color="primary" onClick={spyCallback}>
        Text
      </Button>,
    );

    await userEvent.click(screen.getByText('Text'));

    expect(spyCallback).toHaveBeenCalledTimes(1);
  });

  it('should not execute the callback passed in parameter when disabled is set to true', async () => {
    const spyCallback = vi.fn();

    render(
      <Button color="primary" onClick={spyCallback} disabled>
        Text
      </Button>,
    );

    await userEvent.click(screen.getByText('Text'));

    expect(spyCallback).not.toHaveBeenCalled();
  });
});
