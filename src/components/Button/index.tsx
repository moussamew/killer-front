import { ReactNode } from 'react';

import { Content, Text } from './styles';

interface Props {
  children: ReactNode;
  buttonColor: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

const Button = ({
  children,
  buttonColor,
  onClick,
  type = 'button',
  disabled = false,
}: Props): JSX.Element => (
  <Content
    onClick={onClick}
    type={type}
    $buttonColor={buttonColor}
    disabled={disabled}
  >
    <Text>{children}</Text>
  </Content>
);

export default Button;
