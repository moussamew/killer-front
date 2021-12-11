import { StrictMode } from 'react';
import { render } from 'react-dom';

import Application from './app';

const NODE_APP = document.getElementById('killerparty');

render(
  <StrictMode>
    <Application />
  </StrictMode>,
  NODE_APP,
);
