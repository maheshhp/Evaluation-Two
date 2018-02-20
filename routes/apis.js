const Models = require('../models');
const externalFetchHandler = require('../helpers/externalFetchHandler');
const likeHandler = require('../helpers/likeHandler');
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
      populateDb(JSON.stringify(values)).then((bookInsertResult) => {
        if (bookInsertResult) {
          response({
            statusCode: 201,
          });
        } else {
          response({
            statusCode: 500,
          });
        }
      });
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
          response({
            likeStatus: 'No book found',
            responseCode: 404,
          });
        } else {
          likeHandler(request.payload).then((likeResponse) => {
            console.log('like ==>', likeResponse);
            if (likeResponse) {
              response({
                likeStatus: request.payload.like,
                responseCode: 200,
              });
            } else {
              response({
                likeStatus: 'Error updating like',
                responseCode: 500,
              });
            }
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
