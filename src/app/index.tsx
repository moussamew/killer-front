import { StrictMode } from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from '../components';
import { PlayerProvider } from '../hooks/context';
import Home from '../pages/home/Home';
import Room from '../pages/room/Room';

import '../assets/styles/app.css';

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
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/room">
                <Route path=":roomCode" element={<Room />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Layout>
      </PlayerProvider>
    </QueryClientProvider>
  </StrictMode>,
  NODE_APP,
);
