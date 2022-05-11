import mongoose from 'mongoose';
import { trackService } from '../services/index.js';

async function getTracks(req, res, next) {
  const { uid } = req.user;
  try {
    const tracks = await trackService.getTracksAggregate(uid);
    res.status(200).send({
      data: tracks
    });
  } catch (error) {
    next(error);
  }
}

async function createTrack(req, res, next) {
  try {
    const { uid } = req.user;
    const userInfo = { ...req.body };
    const newTrack = await trackService.createTrack(uid, userInfo);

    res.status(201).send({ data: newTrack });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      res.status(400).send({
        error: `Values are not correct`
      });
    } else {
      next(error);
    }
  }
}

async function updateTrack(req, res, next) {
  const { id } = req.params;
  const userInfo = { ...req.body };

  try {
    const track = await trackService.updateTrack(uid, userInfo);

    if (track) {
      res.status(200).send({
        message: `Track ${id} updated`
      });
    } else {
      res.status(404).send({
        error: 'Track not found'
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getTrackById(req, res, next) {
  const { uid } = req.user;
  const { id } = req.params;
  try {
    const track = await trackService.getTracksByIdAggregate(uid, id);
    if (track) {
      res.status(200).send({
        data: track
      });
    } else {
      res.status(404).send({
        error: 'Track not found'
      });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteTrackById(req, res, next) {
  const { id } = req.params;
  const { uid } = req.user;
  try {
    const track = await trackService.deleteTrackById(uid, id);
    if (track) {
      res.status(200).send({
        message: 'Track deleted'
      });
    } else {
      res.status(404).send({
        error: `Track ${id} not found`
      });
    }
  } catch (error) {
    next(error);
  }
}

async function likeTrackById(req, res, next) {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const newLikes = await trackService.likeTrackById(uid, id);
    if (newLikes) {
      res.status(200).send({
        message: `Track ${id} liked`
      });
    } else {
      res.status(404).send({
        error: `Track ${id} not found`
      });
    }
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      res.status(400).send({
        error: `Track id: ${id} format not valid`
      });
    } else {
      next(error);
    }
  }
}

async function unlikeTrackById(req, res, next) {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const unLiked = await trackService.unlikeTrackById(uid, id);
    if (unLiked) {
      res.status(200).send({
        message: `Track ${id} unliked`
      });
    } else {
      res.status(404).send({
        error: `Track ${id} not found`
      });
    }
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      res.status(400).send({
        error: `Track id: ${id} format not valid`
      });
    } else {
      next(error);
    }
  }
}

async function getlikedTracks(req, res, next) {
  const { uid } = req.user;
  try {
    const tracks = await trackService.getLikedTracksAgreggate(uid);
    res.status(200).send({
      data: tracks
    });
  } catch (error) {
    next(error);
  }
}

async function getCurrentUserTracks(req, res, next) {
  const { uid } = req.user;
  try {
    const tracks = await trackService.getTracksByArtist(uid);
    res.status(200).send({
      data: tracks
    });
  } catch (error) {
    next(error);
  }
}

export {
  getTracks,
  createTrack,
  updateTrack,
  getTrackById,
  deleteTrackById,
  likeTrackById,
  unlikeTrackById,
  getlikedTracks,
  getCurrentUserTracks
};
