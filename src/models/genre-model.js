import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const GenreModel = new mongoose.model('genre', GenreSchema);

export default GenreModel;
