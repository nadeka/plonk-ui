export const API_BASE_URL =
  process.env.NODE_ENV === 'production' ?
    'http://api.exoenzy.me' :
    'http://localhost:6001';

export const WS_BASE_URL =
  process.env.NODE_ENV === 'production' ?
    'ws://api.exoenzy.me' :
    'ws://localhost:6001';
