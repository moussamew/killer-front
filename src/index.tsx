import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ModalProvider } from '@/hooks/context/modal';
import { PlayerProvider } from '@/hooks/context/player';

import { Layout } from './layout/Layout';
import { HomePage } from './pages/home/HomePage';
import { RoomPage } from './pages/room/RoomPage';

import './assets/styles/app.css';

const NODE_APP = document.getElementById('killerparty');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const Application = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <ModalProvider>
      <PlayerProvider>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/room">
                <Route path=":roomCode" element={<RoomPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Layout>
      </PlayerProvider>
    </ModalProvider>
  </QueryClientProvider>
);

render(<Application />, NODE_APP);
