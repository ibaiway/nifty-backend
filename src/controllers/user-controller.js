import UserModel from '../models/user-model.js';

async function login(req, res, next) {
  const { uid, email } = req.user;

  try {
    const user = await db.User.findOne({ _id: uid })
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
    console.log(error);
    next(error);
  }
}

async function editUser(req, res, next) {
  try {
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
    await UserModel.findByIdAndUpdate(req.params.id, {
      email,
      firstName,
      lastName,
      following,
      followedBy,
      artist,
      language,
      profileImage
    });
    res.json({ message: 'User edited' });
  } catch (error) {
    console.log(error);
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
    const {
      firstName,
      lastName,
      following,
      followedBy,
      artist,
      language,
      profileImage
    } = req.body;
    const newUser = await UserModel.create({
      _id: uid,
      email,
      firstName,
      lastName,
      following,
      followedBy,
      artist,
      language,
      profileImage
    }).select('-__v -createdAt -updatedAt');
    res.status(201).send({ data: newUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export { getUser, editUser, signUp, login };
