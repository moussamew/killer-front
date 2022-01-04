import { FunctionComponent } from 'react';

import { Heading1, Heading2, Heading3 } from './styles';

const H1: FunctionComponent = ({ children }) => <Heading1>{children}</Heading1>;

const H2: FunctionComponent = ({ children }) => <Heading2>{children}</Heading2>;

const H3: FunctionComponent = ({ children }) => <Heading3>{children}</Heading3>;

export { H1, H2, H3 };
