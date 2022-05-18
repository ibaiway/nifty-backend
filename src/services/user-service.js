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

async function findByIdFull(id) {
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

async function findById(uid, id) {
  try {
    const user = await UserModel.aggregate([
      {
        $match: { _id: id }
      },
      {
        $addFields: {
          isFollowed: {
            $cond: {
              if: { $in: [uid, '$followedBy'] },
              then: true,
              else: false
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          artisticName: 1,
          firstName: 1,
          lastName: 1,
          profileImage: 1,
          followers: {
            $size: '$followedBy'
          },
          following: {
            $size: '$following'
          },
          isFollowed: 1
        }
      }
    ]);
    return user[0];
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
        $match: matchFilter({ isArtist })
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
        $match: {
          $or: [
            { artisticName: { $regex: filters.regex, $options: 'i' } },
            { firstName: { $regex: filters.regex, $options: 'i' } }
          ]
        }
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

async function followUserById(uid, id) {
  try {
    const followedUser = UserModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { followedBy: uid } }
    );
    const followingUser = UserModel.findOneAndUpdate(
      { _id: uid },
      { $addToSet: { following: uid } }
    );
    if (followedUser && followingUser) {
      return followedUser;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

async function unfollowUserById(uid, id) {
  try {
    const followedUser = UserModel.findOneAndUpdate(
      { _id: id },
      { $pull: { followedBy: uid } }
    );
    const followingUser = UserModel.findOneAndUpdate(
      { _id: uid },
      { $pull: { following: uid } }
    );
    if (followedUser && followingUser) {
      return followedUser;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export {
  signUp,
  findByIdFull,
  findById,
  update,
  getUsers,
  searchUsers,
  followUserById,
  unfollowUserById
};
