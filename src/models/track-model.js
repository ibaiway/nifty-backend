import mongoose from 'mongoose';

const TrackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'The title is required'],
      trim: true
    },
    url: {
      type: String,
      trim: true,
      required: [true, 'The url is required']
    },
    duration: {
      type: Number,
      required: [true, 'The duration is required']
    },
    thumbnail: {
      type: String
    },
    active: {
      type: Boolean,
      default: true
    },
    userId: {
      type: String,
      required: [true, 'The userid is required'],
      ref: 'user'
    },
    featuring: [{ type: String, ref: 'user' }],
    genre: {
      type: mongoose.ObjectId,
      ref: 'genre'
    },
    likedBy: {
      type: [{ type: String, ref: 'user' }],
      default: []
    },
    count: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

TrackSchema.index({ title: 'text' });

const TrackModel = new mongoose.model('track', TrackSchema);

export default TrackModel;
