import { ROOM_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Room } from '@/services/room/types';

export function getRoom(roomCode: string): Promise<Room> {
  return request({ url: `${ROOM_ENDPOINT}/${roomCode}`, method: Method.GET });
}
