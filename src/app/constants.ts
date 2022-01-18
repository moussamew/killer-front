export enum Method {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum PlayerStatus {
  ALIVE = 'ALIVE',
  KILLED = 'KILLED',
}

export enum RoomStatus {
  PENDING = 'PENDING',
  IN_GAME = 'IN_GAME',
  ENDED = 'ENDED',
}

/**
 * --- ENDPOINTS ---
 */

const API_ENDPOINT = process.env.API_URL;

export const PLAYER_ENDPOINT = `${API_ENDPOINT}/player`;
export const ROOM_ENDPOINT = `${API_ENDPOINT}/room`;
