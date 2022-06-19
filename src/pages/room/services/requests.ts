import { ROOM_ENDPOINT } from '@/constants/endpoints';
import { Method } from '@/constants/enums';
import { request } from '@/helpers/apis';
import { Room } from '@/types';

export const getRoom = async (roomCode: string): Promise<Room> =>
  request(`${ROOM_ENDPOINT}/${roomCode}`, Method.GET);
