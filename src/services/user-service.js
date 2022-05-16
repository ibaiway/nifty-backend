import UserModel from '../models/user-model.js';

function matchFilter(filters) {
  let filter = {};

  if (filters.isArtist) {
    filter.artist = true;
  }
  if (filters.regex) {
    filter.artisticName = { $regex: filters.regex, $options: 'i' };
    filter.firstName = { $regex: filters.regex, $options: 'i' };
  }
  return filter;
}

async function findById(id) {
  try {
    const user = await UserModel.findById({ _id: id })
      .select('-__v -createdAt -updatedAt')
      .lean()
      .exec();
    return user;
  } catch (error) {
    throw error;
  }
}

async function signUp(userInfo) {
  try {
    const user = await UserModel.findOne({ email: userInfo.email });
    if (user) {
      return user;
    }
    const newUser = await UserModel.create({
      ...userInfo,
      _id: userInfo.uid
    });

    return newUser;
  } catch (error) {
    throw error;
  }
}

async function update(user) {
  try {
    const { id, ...userDetails } = user;
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...userDetails
        }
      },
      {
        new: true
      }
    ).select({
      email: 1,
      firstName: 1,
      lastName: 1,
      artisticName: 1,
      profileImage: 1,
      artist: 1
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function getUsers(isArtist = false) {
  try {
    const users = await UserModel.aggregate([
      {
        $match: matchFilter(isArtist)
      },
      {
        $project: {
          _id: 1,
          artisticName: 1,
          profileImage: 1,
          followers: {
            $size: '$followedBy'
          }
        }
      }
    ]);
    return users;
  } catch (error) {
    throw error;
  }
}

async function searchUsers(filters) {
  try {
    const users = await UserModel.aggregate([
      {
        $match: matchFilter(filters)
      },
      {
        $project: {
          _id: 1,
          artisticName: 1,
          firstName: 1,
          profileImage: 1
        }
      }
    ]);
    return users;
  } catch (error) {
    throw error;
  }
}

export { signUp, findById, update, getUsers, searchUsers };
