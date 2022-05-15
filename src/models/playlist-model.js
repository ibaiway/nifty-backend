import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is required'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    thumbnail: {
      type: String
    },
    publicAccessible: {
      type: Boolean,
      default: true
    },
    userId: {
      type: String,
      required: [true, 'The userid is required'],
      ref: 'user'
    },
    tracks: {
      type: [
        {
          type: mongoose.ObjectId,
          ref: 'track'
        }
      ],
      default: []
    },
    followedBy: {
      type: [{ type: String, ref: 'user' }],
      default: []
    }
  },
  { timestamps: true }
);

PlaylistSchema.index({ name: 'text' });

const PlaylistModel = new mongoose.model('playlist', PlaylistSchema);

export default PlaylistModel;
