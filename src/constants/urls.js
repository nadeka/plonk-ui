export const API_BASE_URL =
  process.env.NODE_ENV === 'production' ?
    'http://plonk.eu-west-1.elasticbeanstalk.com' :
    'http://localhost:6001';

export const WS_BASE_URL =
  process.env.NODE_ENV === 'production' ?
    'ws://plonk.eu-west-1.elasticbeanstalk.com' :
    'ws://localhost:6001';
