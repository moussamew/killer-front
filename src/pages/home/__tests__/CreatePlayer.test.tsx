import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { vi } from 'vitest';

import CreatePlayer from '../CreatePlayer';

const dummyProps = {
  inputPseudo: '',
  setInputPseudo: (): void => {},
  inputPseudoRef: createRef<HTMLInputElement>(),
};

describe('<CreatePlayer />', () => {
  it('should show the input to create a new Player', () => {
    render(<CreatePlayer {...dummyProps} />);

    expect(
      screen.getByText('To start, enter your nickname!'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Choose a pseudo')).toBeInTheDocument();
  });

  it('should update the value inside the player pseudo input', () => {
    const spySetInputPseudo = vi.fn();

    render(<CreatePlayer {...dummyProps} setInputPseudo={spySetInputPseudo} />);

    fireEvent.change(screen.getByPlaceholderText('Choose a pseudo'), {
      target: { value: 'Neo' },
    });

    expect(spySetInputPseudo).toHaveBeenCalledWith('NEO');
  });
});
