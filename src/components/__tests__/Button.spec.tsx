import { render, fireEvent, screen } from '@testing-library/react';

import { Button } from '..';

describe('<Button />', () => {
  it('should show the text inside the button', () => {
    render(<Button>My Button</Button>);

    expect(screen.getByText('My Button')).toBeInTheDocument();
  });

  it('should execute the callback passed when the button is clicked', () => {
    const spyCallback = jest.fn();

    render(<Button onClick={spyCallback}>My Button</Button>);

    fireEvent.click(screen.getByText('My Button'));

    expect(spyCallback).toHaveBeenCalledTimes(1);
  });

  it('should not execute the callback passed in parameter when disabled is set tot rue', () => {
    const spyCallback = jest.fn();

    render(
      <Button disabled onClick={spyCallback}>
        My Button
      </Button>,
    );

    fireEvent.click(screen.getByText('My Button'));

    expect(spyCallback).not.toHaveBeenCalledTimes(1);
  });
});
