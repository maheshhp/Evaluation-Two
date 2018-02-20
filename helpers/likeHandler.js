const Models = require('../models');

const updateLike = bookToMark => Models.book_like.findOrCreate({
  where: {
    book_id: bookToMark.bookId,
  },
  defaults: {
    book_id: bookToMark.bookId,
    like: -1,
  },
}).then(created => Models.book_like.update(
  {
    like: bookToMark.like === 'yes' ? 1 : 0,
  },
  {
    where: { book_id: bookToMark.bookId },
  },
));

module.exports = updateLike;
