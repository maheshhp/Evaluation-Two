const Models = require('../models');

// params: values - Json string, containing data to be filled into database
// callback - Function to be called once fetch from external API is
// complete and results are formatted
// returns: Calls callback function with database entry transaction status - true/false

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
