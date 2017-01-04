export const API_BASE_URL =
  process.env.NODE_ENV !== 'development' ?
    'https://api.exoenzy.me' :
    'http://localhost:6001';

export const WS_BASE_URL =
  process.env.NODE_ENV !== 'development' ?
    'wss://api.exoenzy.me' :
    'ws://localhost:6001';
