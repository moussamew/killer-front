import { render, fireEvent } from '@testing-library/react';

import { Button } from '..';

describe('<Button />', () => {
  it('should show the text inside the button', () => {
    const { getByText } = render(<Button>My Button</Button>);

    expect(getByText('My Button')).toBeInTheDocument();
  });

  it('should execute the callback passed when the button is clicked', () => {
    const spyCallback = jest.fn();

    const { getByText } = render(
      <Button onClick={spyCallback}>My Button</Button>,
    );

    fireEvent.click(getByText('My Button'));

    expect(spyCallback).toHaveBeenCalledTimes(1);
  });

  it('should not execute the callback passed in parameter when disabled is set tot rue', () => {
    const spyCallback = jest.fn();

    const { getByText } = render(
      <Button disabled onClick={spyCallback}>
        My Button
      </Button>,
    );

    fireEvent.click(getByText('My Button'));

    expect(spyCallback).not.toHaveBeenCalledTimes(1);
  });
});
