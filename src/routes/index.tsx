import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Loader } from '@/components/Loader';
import { RoomProvider } from '@/hooks/context/room';
import { TargetProvider } from '@/hooks/context/target';
import { WebViewDetector } from '@/layout/WebViewDetector';
import { HomePage } from '@/pages/home';
import { JoinRoomPage } from '@/pages/joinRoom';
import { NotFoundPage } from '@/pages/notFound';
import { RoomPage } from '@/pages/room';
import { EndedRoomPage } from '@/pages/room/ended';
import { PendingRoomPage } from '@/pages/room/pending';
import { PlayingRoomPage } from '@/pages/room/playing';

export function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <WebViewDetector>
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
              path=":roomCode/ended"
              element={
                <RoomProvider>
                  <RoomPage page={<EndedRoomPage />} />
                </RoomProvider>
              }
            />
            <Route path=":roomCode" element={<RoomPage page={<Loader />} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </WebViewDetector>
    </BrowserRouter>
  );
}
