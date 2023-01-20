import { PlayerStatus } from '@/services/player/constants';
import { RoomStatus } from '@/services/room/constants';
import { Room } from '@/services/room/types';

export const pendingRoom = {
  id: 17,
  code: 'SOSPC',
  name: "TRINITY's room",
  status: RoomStatus.PENDING,
  players: [
    {
      id: 28,
      name: 'TRINITY',
      status: PlayerStatus.ALIVE,
    },
  ],
  missions: [],
  admin: {
    id: 28,
    name: 'TRINITY',
    status: PlayerStatus.ALIVE,
  },
} satisfies Room;
