import { OK } from 'http-status';
import request from 'supertest';
import app from '../api/index';

describe('Home API Test', () => {
  it('should successfully call API', async () => {
    const response = await request(app).get('/ping').send();

    expect(response.status).toBe(OK);
    expect(response.body).toBe('PONG');
  });
});
