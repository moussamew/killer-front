import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import { CreatePlayerInput } from '../CreatePlayerInput';

const dummyProps = {
  inputPseudo: '',
  setInputPseudo: () => {},
  inputPseudoRef: createRef<HTMLInputElement>(),
  setInputErrorMessage: () => {},
};

describe('<CreatePlayerInput />', () => {
  it('should show the input to create a new Player', () => {
    render(<CreatePlayerInput {...dummyProps} />);

    expect(
      screen.getByText('To start, enter your nickname!'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Choose a pseudo')).toBeInTheDocument();
  });

  it('should update the value inside the player pseudo input', () => {
    const spySetInputPseudo = vi.fn();

    render(
      <CreatePlayerInput {...dummyProps} setInputPseudo={spySetInputPseudo} />,
    );

    fireEvent.change(screen.getByPlaceholderText('Choose a pseudo'), {
      target: { value: 'Neo' },
    });

    expect(spySetInputPseudo).toHaveBeenCalledTimes(1);
    expect(spySetInputPseudo).toHaveBeenCalledWith('NEO');
  });

  it('should let the user close error message if showed', () => {
    const spySetInputErrorMessage = vi.fn();

    render(
      <CreatePlayerInput
        {...dummyProps}
        inputErrorMessage="There is an error while creating the player"
        setInputErrorMessage={spySetInputErrorMessage}
      />,
    );

    fireEvent.click(screen.getByAltText('closeErrorMessage'));

    expect(spySetInputErrorMessage).toHaveBeenCalledTimes(1);
    expect(spySetInputErrorMessage).toHaveBeenCalledWith('');
  });
});
