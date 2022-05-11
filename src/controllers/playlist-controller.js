import PlaylistModel from '../models/playlist-model.js';

async function showPlaylists(req, res, next) {
  try {
    const playlists = await PlaylistModel.find({})
      .select('-__v -createdAt -updatedAt')
      .lean()
      .exec();
    res.status(200).send({
      data: playlists
    });
  } catch (error) {
    next(error);
  }
}

async function createPlaylist(req, res, next) {
  try {
    const { uid } = req.user;
    const {
      name,
      description,
      thumbnail,
      publicAccessible,
      tracks,
      followedBy
    } = req.body;
    const newPlaylist = await PlaylistModel.create({
      userId: uid,
      name,
      description,
      thumbnail,
      publicAccessible,
      tracks,
      followedBy
    });
    res.status(201).send({ data: newPlaylist });
  } catch (error) {
    next(error);
  }
}

async function updatePlaylist(req, res, next) {
  const { id } = req.params;
  const { name, description, thumbnail, publicAccessible, tracks, followedBy } =
    req.body;

  try {
    const updatedPlaylist = await PlaylistModel.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          name: name,
          description: description,
          thumbnail: thumbnail,
          publicAccessible: publicAccessible,
          tracks: tracks,
          followedBy: followedBy
        }
      },
      {
        new: true
      }
    ).select({
      name: 1,
      description: 1
    });

    res.status(200).send({
      data: updatedPlaylist
    });
  } catch (error) {
    next(error);
  }
}

async function getPlaylist(req, res, next) {
  const { id } = req.params;
  try {
    const playlist = await PlaylistModel.findById(id)
      .select('-__v -createdAt -updatedAt')
      .lean()
      .exec();
    if (playlist) {
      res.status(200).send({
        data: playlist
      });
    } else {
      res.status(404).send({
        error: 'Playlist not found'
      });
    }
  } catch (error) {
    next(error);
  }
}

async function deletePlaylist(req, res, next) {
  const { id } = req.params;
  const { uid } = req.user;
  try {
    const playlists = await PlaylistModel.deleteOne({ _id: id, userId: uid });
    if (playlists) {
      res.status(200).send({
        message: 'playlist deleted'
      });
    } else {
      res.status(404).send({
        error: 'playlist not found'
      });
    }
  } catch (error) {
    next(error);
  }
}

async function checkIfUserFollows(req, res, next) {}

async function followPlaylistById(req, res, next) {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const newFollow = await PlaylistModel.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: {
          followedBy: uid
        }
      },
      {
        new: true
      }
    );
    res.status(200).send({
      data: newFollow
    });
  } catch (error) {
    next(error);
  }
}

async function unfollowPlaylistById(req, res, next) {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const unFollowed = await PlaylistModel.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          followedBy: uid
        }
      },
      {
        new: true
      }
    );
    res.status(200).send({
      data: unFollowed
    });
  } catch (error) {
    next(error);
  }
}

export {
  showPlaylists,
  createPlaylist,
  updatePlaylist,
  getPlaylist,
  deletePlaylist,
  checkIfUserFollows,
  followPlaylistById,
  unfollowPlaylistById
};