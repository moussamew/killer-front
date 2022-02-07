import { ReactNode } from 'react';

import { StyledButton, Text } from './styles';

interface Props {
  children: ReactNode;
  buttonColor?: string;
  textColor?: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

const Button = ({
  children,
  buttonColor = 'bg-red-400',
  textColor = 'text-white',
  onClick,
  type = 'button',
  disabled = false,
}: Props): JSX.Element => (
  <StyledButton
    onClick={onClick}
    type={type}
    $buttonColor={buttonColor}
    disabled={disabled}
  >
    <Text $textColor={textColor}>{children}</Text>
  </StyledButton>
);

export default Button;
