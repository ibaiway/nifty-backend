import { userService } from '../services/index.js';

async function getCurrentUser(req, res, next) {
  const { uid } = req.user;
  try {
    const user = await userService.findByIdFull(uid);
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
  const { uid } = req.user;
  try {
    const user = await userService.findById(uid, id);

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

async function getArtists(_req, res, next) {
  try {
    const artists = await userService.getUsers(true);
    res.status(200).send({ data: artists });
  } catch (error) {
    next(error);
  }
}

async function followUserById(req, res, next) {
  {
    try {
      const { uid } = req.user;
      const { id } = req.params;
      const user = await userService.followUserById(uid, id, true);
      if (user) {
        res.status(200).send({
          data: 'followed'
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
}

async function unfollowUserById(req, res, next) {
  {
    try {
      const { uid } = req.user;
      const { id } = req.params;
      const user = await userService.unfollowUserById(uid, id);
      if (user) {
        res.status(200).send({
          data: 'unfollowed'
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
}

async function getPopularArtists(req, res, next) {
  try {
    const { uid } = req.user;
    const artists = await userService.getArtistsOrderedByFollowers(uid);
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
  getArtists,
  followUserById,
  unfollowUserById,
  getPopularArtists
};
