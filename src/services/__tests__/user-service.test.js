import UserModel from '../../models/user-model';
import * as UserService from '../user-service';
import mongoose from 'mongoose';

describe('User Service Tests', () => {
  const CORRECT_USER_INFO = {
    _id: 'ThIsIsJuStAtEsT0123456789',
    firstName: 'Patrick',
    lastName: 'Jane',
    email: 'patrickjane@mail.com',
    following: [],
    followedBy: [],
    artist: false,
    language: 'en',
    profileImage: 'someUrlgoesHere'
  };
  describe('Signing Up Users', () => {
    test('Should create a user', async () => {
      UserModel.findOne = jest.fn().mockImplementation(() => {});
      UserModel.create = jest.fn().mockImplementation(() => {
        return { ...CORRECT_USER_INFO };
      });
      const user = await UserService.signUp({ ...CORRECT_USER_INFO });
      await expect(user).toEqual({ ...CORRECT_USER_INFO });
    });

    test('Should find an existing user', async () => {
      UserModel.findOne = jest.fn().mockImplementation(() => {
        return { ...CORRECT_USER_INFO };
      });
      UserModel.create = jest.fn().mockImplementation(() => {});
      const user = await UserService.signUp({ ...CORRECT_USER_INFO });
      await expect(user).toEqual({ ...CORRECT_USER_INFO });
    });

    test('Missing firstName should throw an error', async () => {
      UserModel.findOne = jest.fn().mockImplementation(() => {});
      UserModel.create = jest
        .fn()
        .mockRejectedValue(new mongoose.Error.ValidationError());

      await expect(
        async () =>
          await UserService.signUp({ ...CORRECT_USER_INFO, firstName: '' })
      ).rejects.toThrowError(new mongoose.Error.ValidationError());
    });
  });

  describe('Finding user by id', () => {
    test('Should find a user', async () => {
      UserModel.aggregate = jest.fn().mockImplementation(() => {
        return [{ ...CORRECT_USER_INFO }];
      });
      const user = await UserService.findById(
        'someOtherUid',
        CORRECT_USER_INFO._id
      );
      await expect(user).toEqual({ ...CORRECT_USER_INFO });
    });
  });

  describe('Update user by id', () => {
    test('Should update the user', async () => {
      UserModel.findOneAndUpdate = jest.fn().mockImplementation(() => ({
        select: jest.fn().mockImplementation(() => {
          return { ...CORRECT_USER_INFO, firstName: 'Christian' };
        })
      }));
      const user = await UserService.update({
        ...CORRECT_USER_INFO,
        firstName: 'Christian'
      });
      await expect(user).toEqual({
        ...CORRECT_USER_INFO,
        firstName: 'Christian'
      });
    });

    test('Passing String instead of Boolean should throw an error', async () => {
      UserModel.findOneAndUpdate = jest.fn().mockImplementation(() => ({
        select: jest
          .fn()
          .mockRejectedValue(new mongoose.Error.ValidationError())
      }));

      await expect(
        async () =>
          await UserService.update({
            ...CORRECT_USER_INFO,
            artist: 'artist'
          })
      ).rejects.toThrowError(new mongoose.Error.ValidationError());
    });
  });
});
