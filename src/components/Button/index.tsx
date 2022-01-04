import { FunctionComponent } from 'react';

import { Content, Text } from './styles';

interface Props {
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  buttonColor?: string;
}

const Button: FunctionComponent<Props> = ({
  children,
  onClick,
  type = 'button',
  buttonColor = 'bg-brown',
}) => (
  <Content onClick={onClick} type={type} $buttonColor={buttonColor}>
    <Text>{children}</Text>
  </Content>
);

export default Button;
