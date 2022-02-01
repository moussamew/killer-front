import { FunctionComponent } from 'react';

import { Content } from './styles';

interface Props {
  focusable?: boolean;
}

const Card: FunctionComponent<Props> = ({ children, focusable = false }) => (
  <Content $focusable={focusable}>{children}</Content>
);

export default Card;
