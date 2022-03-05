/**
 * --- ENDPOINTS ---
 */

const API_ENDPOINT = process.env.API_URL;

export const PLAYER_ENDPOINT = `${API_ENDPOINT}/player`;
export const PLAYER_SESSION_ENDPOINT = `${API_ENDPOINT}/player/me`;
export const ROOM_ENDPOINT = `${API_ENDPOINT}/room`;
