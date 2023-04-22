import { RoomStatus } from '@/services/room/constants';

export const roomStatusToRoute = {
  [RoomStatus.PENDING]: 'pending',
  [RoomStatus.IN_GAME]: 'playing',
  [RoomStatus.ENDED]: 'ended',
};
