const API_ENDPOINT = process.env.API_URL;
const MERCURE_ENDPOINT = process.env.MERCURE_URL;

/**
 * --- ENDPOINTS ---
 */
export const PLAYER_ENDPOINT = `${API_ENDPOINT}/player`;
export const PLAYER_SESSION_ENDPOINT = `${API_ENDPOINT}/player/me`;
export const ROOM_ENDPOINT = `${API_ENDPOINT}/room`;

/**
 * --- TOPICS (SSE)  ---
 */
export const ROOM_TOPIC = `${MERCURE_ENDPOINT}?topic=${ROOM_ENDPOINT}`;
