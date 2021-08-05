export const API_URL =
  process.env.DEPLOY_PLATFORM === 'netlify'
    ? process.env.NETLIFY_API_URL || 'http://localhost:8888/.netlify/functions'
    : '';
