import axios from 'axios';
import { NOT_FOUND, OK } from 'http-status';
import request from 'supertest';
import app from '../../../api/index';

jest.setTimeout(700000);
jest.mock('axios', () => {
  return {
    create: jest.fn().mockReturnThis(),
    get: jest.fn().mockImplementation(async () => ({ data: '' })),
    post: jest.fn().mockImplementation(async () => ({ data: '' })),
    patch: jest.fn().mockImplementation(async () => ({ data: '' })),
    delete: jest.fn().mockImplementation(async () => ({ data: '' }))
  };
});
const API_PATH = '/getAllAddresses';

describe('Address API Test', () => {
  it('route not found', async () => {
    const response = await request(app)
      .get('/getAllAddre')
      .query({ customerId: 'test' });

    expect(response.status).toBe(NOT_FOUND);
  });
  it('route not found', async () => {
    const customerId = 'test';
    const response = await request(app)
      .get(`${API_PATH}`)
      .query({ customerId });

    expect(response.status).toBe(OK);
    expect(axios.get).toBeCalledWith(
      `/stores/${process.env.STORE_HASH}/v2/customers/${customerId}/addresses`
    );
  });
});
