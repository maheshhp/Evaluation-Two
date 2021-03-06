const Models = require('../models');

// params: values - Json string, containing data to be filled into database
// callback - Function to be called once fetch from external API is
// complete and results are formatted
// returns: Calls callback function with database entry transaction status - true/false

const populateDb = values => Models.books.destroy({
  where: {},
})
  .then((bookDesRes) => {
    Models.book_like.destroy({
      where: {},
    });
  })
  .then((likeDesRes) => {
    const bookJson = JSON.parse(values);
    const bookInsertJson = [];
    Object.keys(bookJson).forEach((author) => {
      bookJson[author].forEach((item) => {
        bookInsertJson.push(Models.books.upsert({
          id: item.id,
          bookId: item.id,
          name: item.name,
          author: item.author,
          rating: item.rating,
        }).then(bookInsertObject => Models.book_like.upsert({
          id: item.id,
          book_id: item.id,
          like: 0,
        })));
      });
    });
    return Promise.all(bookInsertJson);
  });

module.exports = populateDb;
