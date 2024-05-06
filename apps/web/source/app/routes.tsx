import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from '@/layout/Layout';
import { ContactPage } from '@/pages/Contact';
import { HomePage } from '@/pages/Home';
import { ChooseAvatar } from '@/pages/Home/ChooseAvatar';
import { ChoosePseudo } from '@/pages/Home/ChoosePseudo';
import { CreateRoom } from '@/pages/Home/CreateRoom';
import { JoinRoom } from '@/pages/Home/JoinRoom';
import { JoinRoomPage } from '@/pages/JoinRoom';
import { NotFoundPage } from '@/pages/NotFound';
import { PrivacyPage } from '@/pages/Privacy';
import { RoomPage } from '@/pages/Room';
import { EndedRoomPage } from '@/pages/Room/Ended';
import { PendingRoomPage } from '@/pages/Room/Pending';
import { PendingRoomPageV2 } from '@/pages/Room/PendingV2';
import { PlayingRoomPage } from '@/pages/Room/Playing';

export function Routes(): JSX.Element {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          element: <Layout />,
          children: [
            { path: '/', element: <HomePage /> },
            { path: '/join/:roomCode', element: <JoinRoomPage /> },
            {
              path: '/room/:roomCode',
              element: <RoomPage />,
              children: [
                {
                  path: '/room/:roomCode/pending',
                  element: <PendingRoomPage />,
                },
                {
                  path: '/room/:roomCode/pending/v2',
                  element: <PendingRoomPageV2 />,
                },
                {
                  path: '/room/:roomCode/playing',
                  element: <PlayingRoomPage />,
                },
                {
                  path: '/room/:roomCode/ended',
                  element: <EndedRoomPage />,
                },
              ],
            },
            { path: '/privacy', element: <PrivacyPage /> },
            { path: '/contact', element: <ContactPage /> },
            { path: '*', element: <NotFoundPage /> },
          ],
        },
        { path: '/choose-pseudo', element: <ChoosePseudo /> },
        { path: '/choose-avatar', element: <ChooseAvatar /> },
        { path: '/create-room', element: <CreateRoom /> },
        { path: '/join-room', element: <JoinRoom /> },
      ])}
    />
  );
}
