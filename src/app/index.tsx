import { StrictMode } from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { PlayerProvider } from '../hooks/context';
import Home from '../pages/home';
import Room from '../pages/room';

import 'tailwindcss/tailwind.css';

const NODE_APP = document.getElementById('killerparty');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/play" />} />
            <Route path="/play" element={<Home />} />
            <Route path="/room">
              <Route path=":roomCode" element={<Room />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </QueryClientProvider>
  </StrictMode>,
  NODE_APP,
);
