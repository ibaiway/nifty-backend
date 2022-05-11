import mongoose from 'mongoose';

function parseToObjectId(id) {
  return mongoose.Types.ObjectId(id);
}

export { parseToObjectId };
