import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ModalProvider } from '@/hooks/context/modal';
import { PlayerProvider } from '@/hooks/context/player';

import { Loader } from './components/Loader';
import { RoomProvider } from './hooks/context/room';
import { TargetProvider } from './hooks/context/target';
import { HomePage } from './pages/home';
import { JoinRoomPage } from './pages/joinRoom/JoinRoomPage';
import { NotFoundPage } from './pages/notFound';
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
                element={
                  <RoomProvider>
                    <RoomPage page={<PendingRoomPage />} />
                  </RoomProvider>
                }
              />
              <Route
                path=":roomCode/playing"
                element={
                  <RoomProvider>
                    <TargetProvider>
                      <RoomPage page={<PlayingRoomPage />} />
                    </TargetProvider>
                  </RoomProvider>
                }
              />
              <Route
                path=":roomCode"
                element={<RoomPage page={<Loader />} />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </ModalProvider>
  </QueryClientProvider>
);

render(<Application />, NODE_APP);
