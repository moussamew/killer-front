import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ModalProvider } from '@/hooks/context/modal';
import { PlayerProvider } from '@/hooks/context/player';

import { HomePage } from './pages/home/HomePage';
import { JoinRoomPage } from './pages/joinRoom/JoinRoomPage';
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/room">
              <Route path=":roomCode" element={<RoomPage />} />
            </Route>
            <Route path="/join">
              <Route path=":roomCode" element={<JoinRoomPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </ModalProvider>
  </QueryClientProvider>
);

render(<Application />, NODE_APP);
