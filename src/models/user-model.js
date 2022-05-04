import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema(
  {
    _id: String,
    email: {
      type: String,
      required: [true, 'The email is required'],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `The email ${props.value} is not valid`
      }
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, 'The first name is required'],
      minlength: 2,
      maxlength: 20
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 30
    },
    following: [{ type: String, ref: 'User' }],
    followedBy: [{ type: String, ref: 'User' }],
    artist: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'en',
      maxlength: 2
    },
    profileImage: {
      type: String
    }
  },
  { timestamps: true }
);

const UserModel = new mongoose.model('user', UserSchema);

export default UserModel;
