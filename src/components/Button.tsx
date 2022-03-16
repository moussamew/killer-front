import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';

const StyledButton = tw.button<{
  $buttonColor: string;
  disabled: boolean;
}>`
  ${({ $buttonColor }): string => $buttonColor}
  ${({ disabled }): string =>
    disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    
  transition-shadow duration-500 ease-in 
  shadow-md hover:shadow-xl
  p-1 mt-1 rounded-lg 
  w-full text-3xl
`;

const Text = tw.p<{ $textColor: string }>`
  ${({ $textColor }): string => $textColor}
  font-medium text-3xl
`;

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
