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
          trackId: { type: mongoose.ObjectId, ref: 'genre' },
          order: { type: Number }
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

const PLaylistModel = new mongoose.model('playlist', PlaylistSchema);

export default PLaylistModel;
