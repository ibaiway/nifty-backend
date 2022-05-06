import mongoose from 'mongoose';
import connect from '../connect.js';
import config from '../../config/config.js';

jest.mock('mongoose', () => ({
  connect: jest.fn()
}));

describe('mongoose schemas', () => {
  test('1. the `connect` function calls `mongoose.connect` with the url and options', async () => {
    await connect();

    expect(mongoose.connect).toHaveBeenCalledTimes(1);

    expect(mongoose.connect.mock.calls[0][0]).toBe(config.db.url);
  });
});
