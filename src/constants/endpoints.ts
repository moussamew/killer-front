import { API_URL, MERCURE_URL } from './app';

/**
 * --- ENDPOINTS ---
 */
export const PLAYER_ENDPOINT = `${API_URL}/player`;
export const PLAYER_SESSION_ENDPOINT = `${API_URL}/player/me`;
export const ROOM_ENDPOINT = `${API_URL}/room`;

/**
 * --- TOPICS (SSE)  ---
 */
export const ROOM_TOPIC = `${MERCURE_URL}?topic=room`;
