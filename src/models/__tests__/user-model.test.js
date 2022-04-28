//import * as db from '../index.js';
//import UserModel from '../user-model.js';
import db from '../index.js';
import server from '../../utils/tests/server.js';

describe('mongoose schemas', () => {
  beforeAll(async () => await server.initTestServer());
  afterEach(async () => await server.clearUsersCollection());
  afterAll(async () => await server.stopTestServer());

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

  describe("1. create the 'User' model following the schema requirements", () => {
    test('1.1.1 the firstName is required', async () => {
      expect.assertions(1);

      try {
        const { firstName, ...props } = CORRECT_USER_INFO;

        await db.User.create(props);
      } catch (error) {
        expect(error.errors.firstName.properties.message).toMatch(
          /The first name is required/
        );
      }
    });

    test('1.1.3 trims the first name', async () => {
      const user = await db.User.create({
        ...CORRECT_USER_INFO,
        firstName: '  name   '
      });
      expect(user.firstName).toBe('name');
    });

    test('1.2.1 trims the last name', async () => {
      const user = await db.User.create({
        ...CORRECT_USER_INFO,
        lastName: '  name   '
      });
      expect(user.lastName).toBe('name');
    });

    test('1.3.1 the email is required', async () => {
      expect.assertions(1);

      try {
        const { email, ...props } = CORRECT_USER_INFO;

        await db.User.create(props);
      } catch (error) {
        expect(error.errors.email.properties.message).toMatch(
          /The email is required/
        );
      }
    });

    test('1.3.3 trims the email', async () => {
      const user = await db.User.create({
        ...CORRECT_USER_INFO,
        email: '  mail@mail.com   '
      });
      expect(user.email).toBe('mail@mail.com');
    });

    test('1.3.3 trims the email', async () => {
      const user = await db.User.create({
        ...CORRECT_USER_INFO,
        email: '  mail@mail.com   '
      });
      expect(user.email).toBe('mail@mail.com');
    });

    test('1.3.4 the email is unique', async () => {
      expect.assertions(1);

      try {
        await db.User.create({
          ...CORRECT_USER_INFO
        });
        await db.User.create({
          ...CORRECT_USER_INFO
        });
      } catch (error) {
        expect(error.message).toMatch(/E11000 duplicate key/);
      }
    });

    test('1.3.5 fails to create a user with an invalid email', async () => {
      expect.assertions(1);

      try {
        await db.User.create({
          ...CORRECT_USER_INFO,
          email: 28
        });
      } catch (error) {
        expect(error.errors.email.properties.message).toMatch(/is not valid/);
      }
    });

    test('1.5.1 the following prop is an array', async () => {
      expect.assertions(1);

      const user = await db.User.create({
        ...CORRECT_USER_INFO
      });

      expect(user.following).toEqual(
        expect.arrayContaining([...CORRECT_USER_INFO.following])
      );
    });

    test('1.6.1 the followedBy prop is an array', async () => {
      expect.assertions(1);

      const user = await db.User.create({
        ...CORRECT_USER_INFO
      });

      expect(user.followedBy).toEqual(
        expect.arrayContaining([...CORRECT_USER_INFO.followedBy])
      );
    });

    test('1.6.1 the language prop is too long', async () => {
      expect.assertions(1);

      try {
        await db.User.create({
          ...CORRECT_USER_INFO,
          language: 'english'
        });
      } catch (error) {
        console.log(error.errors.language.properties.message);
        expect(error.errors.language.properties.message).toMatch(
          'Path `language` (`english`) is longer than the maximum allowed length (2)'
        );
      }
    });

    test('1.7 the user doc includes the timestamps', async () => {
      const user = await db.User.create(CORRECT_USER_INFO);

      expect(user.createdAt).toEqual(expect.any(Date));
      expect(user.updatedAt).toEqual(expect.any(Date));
    });
  });
});
