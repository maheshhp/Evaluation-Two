const Models = require('../models');
const externalFetchHandler = require('../helpers/externalFetchHandler');
const populateDb = require('../helpers/populateDb');

module.exports = [{
  method: 'GET',
  path: '/books',
  handler: (request, response) => {
    response('Welcome to the API');
  },
},
{
  method: 'GET',
  path: '/books/booksWithRatings',
  handler: (request, response) => {
    const fetchCallback = (values) => {
      response(values);
    };
    externalFetchHandler(fetchCallback);
  },
},
{
  method: 'GET',
  path: '/books/populateBookDetails',
  handler: (request, response) => {
    const fetchCallback = (values) => {
      const dbCallback = (transactionStatus) => {
        if (transactionStatus) {
          response({
            statusCode: 201,
          });
        } else {
          response({
            statusCode: 500,
          });
        }
      };
      populateDb(JSON.stringify(values), dbCallback);
    };
    externalFetchHandler(fetchCallback);
  },
},
{
  method: 'POST',
  path: '/books/booksRating',
  handler: (request, response) => {
    Models.books.findOne({
      where: {
        bookId: request.payload.bookId,
      },
    })
      .then((book) => {
        if (book === null) {
          throw new Error('No such book.');
        }
        if (request.payload.like === 'yes') {
          return book.updateAttributes({
            like: 1,
          });
        } else if (request.payload.like === 'no') {
          return book.updateAttributes({
            like: 0,
          });
        }
        throw new Error('Invalid like input');
      })
      .then((dbResponse) => {
        if (dbResponse.like === 1) {
          response({
            likeStatus: 'yes',
            responseCode: 200,
          });
        } else if (dbResponse.like === 0) {
          response({
            likeStatus: 'no',
            responseCode: 200,
          });
        } else {
          response({
            likeStatus: undefined,
            responseCode: 404,
          });
        }
      })
      .catch((error) => {
        response({
          likeStatus: error,
          responseCode: 500,
        });
      });
  },
}];
