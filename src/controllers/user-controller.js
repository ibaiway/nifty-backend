import UserModel from '../models/user-model.js';

async function getCurrentUser(req, res, next) {
  const { uid } = req.user;
  try {
    const user = await UserModel.findById({ _id: uid })
      .select('-__v -createdAt -updatedAt')
      .lean()
      .exec();
    if (user) {
      res.status(200).send({
        data: user
      });
    } else {
      res.status(404).send({
        error: 'User not found'
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id)
      .select('-__v -createdAt -updatedAt')
      .lean()
      .exec();

    if (user) {
      res.status(200).send({
        data: user
      });
    } else {
      res.status(404).send({
        error: 'User not found'
      });
    }
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  const { id } = req.params;
  const {
    email,
    firstName,
    lastName,
    following,
    followedBy,
    artist,
    language,
    profileImage
  } = req.body;
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          following: following,
          followedBy: followedBy,
          artist: artist,
          language: language,
          profileImage: profileImage
        }
      },
      {
        new: true
      }
    ).select({
      email: 1,
      firstName: 1,
      lastName: 1,
      profileImage: 1,
      artist: 1
    });
    if (updatedUser) {
      res.status(200).send({
        data: updatedUser
      });
    } else {
      res.status(404).send({
        error: 'User not found'
      });
    }
  } catch (error) {
    next(error);
  }
}

async function signUp(req, res, next) {
  try {
    const { uid, email } = req.user;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(200).send({ data: user });
    }
    const { firstName, lastName, language } = req.body;
    const newUser = await UserModel.create({
      _id: uid,
      email,
      firstName,
      lastName,
      language
    });
    res.status(201).send({ data: newUser });
  } catch (error) {
    next(error);
  }
}

async function signUpWithProvider(req, res, next) {
  try {
    const { uid, email } = req.user;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(200).send({ data: user });
    }
    const { firstName, language } = req.body;
    const newUser = await UserModel.create({
      _id: uid,
      email,
      firstName,
      language
    });
    res.status(201).send({ data: newUser });
  } catch (error) {
    next(error);
  }
}

export { getUser, updateUser, signUp, signUpWithProvider, getCurrentUser };
