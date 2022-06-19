import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ModalProvider } from '@/hooks/context/modal';
import { PlayerProvider } from '@/hooks/context/player';

import { Loader } from './components/Loader';
import { HomePage } from './pages/home';
import { JoinRoomPage } from './pages/joinRoom/JoinRoomPage';
import { RoomPage } from './pages/room';
import { PendingRoomPage } from './pages/room/pending';
import { PlayingRoomPage } from './pages/room/playing';

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
            <Route path="/join">
              <Route path=":roomCode" element={<JoinRoomPage />} />
            </Route>
            <Route path="/room">
              <Route
                path=":roomCode/pending"
                element={<RoomPage page={<PendingRoomPage />} />}
              />
              <Route
                path=":roomCode/playing"
                element={<RoomPage page={<PlayingRoomPage />} />}
              />
              <Route
                path=":roomCode"
                element={<RoomPage page={<Loader />} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </ModalProvider>
  </QueryClientProvider>
);

render(<Application />, NODE_APP);
