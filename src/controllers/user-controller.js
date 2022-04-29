import UserModel from '../models/user-model.js';

async function login(req, res, next) {
  const { uid, email } = req.user;
  try {
    const user = await UserModel.findOne({ _id: uid })
      .select('-__v -createdAt -updatedAt')
      .lean()
      .exec();
    if (user) {
      res.status(200).send({
        data: user
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await UserModel.findById(req.params.id).lean().exec();
    res.status(200).send({
      data: user
    });
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
      lastName: 1
    });

    res.status(200).send({
      data: updatedUser
    });
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

export { getUser, updateUser, signUp, signUpWithProvider, login };
