import { RoomProvider } from '@/hooks/context/room';
import { TargetProvider } from '@/hooks/context/target';

import { Room } from './Room';

interface Props {
  page: JSX.Element;
}

export const RoomPage = ({ page }: Props): JSX.Element => (
  <RoomProvider>
    <TargetProvider>
      <Room page={page} />
    </TargetProvider>
  </RoomProvider>
);
