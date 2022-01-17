import { ReactNode } from 'react';

import { Content, Text } from './styles';

interface Props {
  children: ReactNode;
  buttonColor: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
}

const Button = ({
  children,
  buttonColor,
  onClick,
  type = 'button',
}: Props): JSX.Element => (
  <Content onClick={onClick} type={type} $buttonColor={buttonColor}>
    <Text>{children}</Text>
  </Content>
);

export default Button;
