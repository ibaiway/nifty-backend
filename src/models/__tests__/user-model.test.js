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

  describe("2. create the 'User' model following the schema requirements", () => {
    test('2.1.1 the firstName is required', async () => {
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

    test('2.1.3 trims the first name', async () => {
      const user = await db.User.create({
        ...CORRECT_USER_INFO,
        firstName: '  name   '
      });
      expect(user.firstName).toBe('name');
    });
  });
});
