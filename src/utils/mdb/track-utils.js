function fieldsToProject() {
  return {
    _id: 1,
    title: 1,
    url: 1,
    duration: 1,
    thumbnail: 1,
    isLiked: 1,
    'artist._id': 1,
    'artist.artisticName': 1,
    'genre._id': 1,
    'genre.name': 1
  };
}

function lookupUser() {
  return {
    from: 'users',
    localField: 'userId',
    foreignField: '_id',
    as: 'artist'
  };
}

function lookupGenre() {
  return {
    from: 'genres',
    localField: 'genre',
    foreignField: '_id',
    as: 'genre'
  };
}

export { fieldsToProject, lookupUser, lookupGenre };
