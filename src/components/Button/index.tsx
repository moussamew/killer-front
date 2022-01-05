import { FunctionComponent } from 'react';

import { Content, Text } from './styles';

interface Props {
  buttonColor: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
}

const Button: FunctionComponent<Props> = ({
  children,
  buttonColor,
  onClick,
  type = 'button',
}) => (
  <Content onClick={onClick} type={type} $buttonColor={buttonColor}>
    <Text>{children}</Text>
  </Content>
);

export default Button;
