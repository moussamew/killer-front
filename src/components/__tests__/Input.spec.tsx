import { render } from '@testing-library/react';

import { Input } from '..';

describe('Input', () => {
  it('should display the value inside the input', () => {
    const { getByDisplayValue } = render(
      <Input id="input" value="John Wick" onChange={(): void => {}} />,
    );

    expect(getByDisplayValue('John Wick')).toBeInTheDocument();
  });

  it('should display the label if given', () => {
    const { getByLabelText } = render(
      <Input
        id="input"
        value="John Wick"
        onChange={(): void => {}}
        label="Pseudo"
      />,
    );

    expect(getByLabelText('Pseudo')).toBeInTheDocument();
  });

  it('should display error message if given', () => {
    const { getByText } = render(
      <Input
        id="input"
        value="John Wick"
        onChange={(): void => {}}
        errorMessage="This pseudo is already used"
      />,
    );

    expect(getByText('This pseudo is already used')).toBeInTheDocument();
  });
});
