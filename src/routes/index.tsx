import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { WebViewDetector } from '@/layout/WebViewDetector';
import { HomePage } from '@/pages/Home';
import { JoinRoomPage } from '@/pages/JoinRoom';
import { NotFoundPage } from '@/pages/NotFound';
import { RoomPage } from '@/pages/Room';
import { EndedRoomPage } from '@/pages/Room/Ended';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { PlayingRoomPage } from '@/pages/Room/Playing';

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
            <Route path=":roomCode/pending" element={<PendingRoomPage />} />
            <Route path=":roomCode/playing" element={<PlayingRoomPage />} />
            <Route path=":roomCode/ended" element={<EndedRoomPage />} />
            <Route path=":roomCode" element={<RoomPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </WebViewDetector>
    </BrowserRouter>
  );
}
