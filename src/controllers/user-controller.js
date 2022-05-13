import { userService } from '../services/index.js';

async function getCurrentUser(req, res, next) {
  const { uid } = req.user;
  try {
    const user = await userService.findById(uid);
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
    const user = await userService.findById(id);

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
  const { uid } = req.user;

  try {
    const updatedUser = await userService.update({ ...req.body, id: uid });
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
    const user = await userService.signUp({ ...req.body, ...req.user });

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
}

async function signUpWithProvider(req, res, next) {
  try {
    const user = await userService.signUp({ ...req.body, ...req.user });

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
}

async function getArtists(req, res, next) {
  try {
    const artists = await userService.getUsers(true);
    res.status(200).send({ data: artists });
  } catch (error) {
    next(error);
  }
}

export {
  getUser,
  updateUser,
  signUp,
  signUpWithProvider,
  getCurrentUser,
  getArtists
};
