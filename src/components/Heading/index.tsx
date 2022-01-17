import { ReactNode } from 'react';

import { Heading1, Heading2, Heading3 } from './styles';

interface Props {
  children: ReactNode;
}

const H1 = ({ children }: Props): JSX.Element => (
  <Heading1>{children}</Heading1>
);

const H2 = ({ children }: Props): JSX.Element => (
  <Heading2>{children}</Heading2>
);

const H3 = ({ children }: Props): JSX.Element => (
  <Heading3>{children}</Heading3>
);

export { H1, H2, H3 };
