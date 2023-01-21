import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';

import { HomePage } from '@/pages/Home';
import { JoinRoomPage } from '@/pages/JoinRoom';
import { NotFoundPage } from '@/pages/NotFound';
import { RoomPage } from '@/pages/Room';
import { EndedRoomPage } from '@/pages/Room/Ended';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { PlayingRoomPage } from '@/pages/Room/Playing';

/* export function AppRoutes(): JSX.Element {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <HomePage />,
        },
        { path: '/join/:roomCode', element: <JoinRoomPage /> },
        { path: '/room/:roomCode', element: <RoomPage /> },
        { path: '/room/:roomCode/pending', element: <PendingRoomPage /> },
        { path: '/room/:roomCode/playing', element: <PlayingRoomPage /> },
        { path: '/room/:roomCode/ended', element: <EndedRoomPage /> },
        { path: '*', element: <NotFoundPage /> },
      ])}
    />
  );
}
 */

export function AppRoutes(): JSX.Element {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
