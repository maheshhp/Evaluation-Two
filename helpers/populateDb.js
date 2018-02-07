const Models = require('../models');

const populateDb = (values, callback) => {
  const resCounter = 0;
  Models.books.destroy({
    where: {},
  }).then((result) => {
    const bookJson = JSON.parse(values);
    Object.keys(bookJson).forEach((author) => {
      bookJson[author].forEach((item) => {
        Models.books.create({
          bookId: item.id,
          name: item.name,
          author: item.author,
          rating: item.rating,
          like: 0,
        }).then((result) => {
        })
          .catch((error) => {
            callback(false);
          });
      });
    });
  })
    .catch((error) => {
      console.log(error.toString());
      callback(false);
    });
  callback(true);
};

module.exports = populateDb;
