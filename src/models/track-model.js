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
    public: {
      type: Boolean,
      default: true
    },
    userId: {
      type: mongoose.SchemaType.ObjectId,
      required: [true, 'The userid is required'],
      ref: 'user'
    },
    featuring: [{ type: mongoose.SchemaType.ObjectId, ref: 'user' }],
    genre: {
      type: mongoose.SchemaType.ObjectId
    },
    likedBy: {
      type: [{ type: mongoose.SchemaType.ObjectId, ref: 'user' }],
      default: []
    }
  },
  { timestamps: true }
);

const TrackModel = new mongoose.model('track', TrackSchema);

export default TrackModel;
