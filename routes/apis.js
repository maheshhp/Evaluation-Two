const https = require('https');
const http = require('http');
const Models = require('../models');

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
    let apiOneResponse = '';
    const newBookJson = {};
    https.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (extApiResponse) => {
      extApiResponse.setEncoding('UTF8');
      extApiResponse.on('data', (data) => {
        apiOneResponse += data.toString();
      });
      extApiResponse.on('end', (end) => {
        apiOneResponse = JSON.parse(apiOneResponse);
        let bookIds = Object.keys(apiOneResponse.books);
        const promiseArray = [];
        bookIds = bookIds.map(bid => apiOneResponse.books[bid].id);
        apiOneResponse.books.forEach((item) => {
          promiseArray.push(new Promise((resolve, reject) => {
            https.get(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${item.id}`, (secResponse) => {
              secResponse.setEncoding('UTF8');
              const newBookObject = {
                id: 0,
                rating: 0,
                author: '',
                name: '',
              };
              secResponse.on('data', (data) => {
                newBookObject.rating = JSON.parse(data.toString()).rating;
              });
              secResponse.on('end', (end) => {
                newBookObject.id = item.id;
                newBookObject.name = item.Name;
                newBookObject.author = item.Author;
                resolve(newBookObject);
              });
            });
          }));
        });
        Promise.all(promiseArray).then((values) => {
          const finalBookJson = {};
          values.forEach((item) => {
            if (typeof finalBookJson[item.author] === 'undefined') {
              finalBookJson[item.author] = [];
            }
            finalBookJson[item.author].push({
              author: item.author,
              id: item.id,
              name: item.name,
              rating: item.rating,
            });
          });
          response(finalBookJson);
        });
      });
    });
  },
},
{
  method: 'GET',
  path: '/books/populateBookDetails',
  handler: (request, response) => {
    let apiOneResponse = '';
    const newBookJson = {};
    https.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (extApiResponse) => {
      extApiResponse.setEncoding('UTF8');
      extApiResponse.on('data', (data) => {
        apiOneResponse += data.toString();
      });
      extApiResponse.on('end', (end) => {
        apiOneResponse = JSON.parse(apiOneResponse);
        let bookIds = Object.keys(apiOneResponse.books);
        const promiseArray = [];
        bookIds = bookIds.map(bid => apiOneResponse.books[bid].id);
        apiOneResponse.books.forEach((item) => {
          promiseArray.push(new Promise((resolve, reject) => {
            https.get(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${item.id}`, (secResponse) => {
              secResponse.setEncoding('UTF8');
              const newBookObject = {
                id: 0,
                rating: 0,
                author: '',
                name: '',
              };
              secResponse.on('data', (data) => {
                newBookObject.rating = JSON.parse(data.toString()).rating;
              });
              secResponse.on('end', (end) => {
                newBookObject.id = item.id;
                newBookObject.name = item.Name;
                newBookObject.author = item.Author;
                resolve(newBookObject);
              });
            });
          }));
        });
        Promise.all(promiseArray).then((values) => {
          const finalBookJson = {};
          values.forEach((item) => {
            Models.books.create({
              bookId: item.id,
              name: item.name,
              author: item.author,
              rating: item.rating,
              like: 0,
            }).then((result) => {
            })
              .catch((error) => {
                response({
                  data: `Error has occurred => ${error}`,
                  statusCode: 500,
                });
              });
          });
          response({
            statusCode: 201,
          });
        });
      });
    });
  },
},
{
  method: 'POST',
  path: '/books/books/booksRating',
  handler: (request, response) => {
    const bookId = request.payload.bookId;
    const likeStatus = request.payload.like;
    // Check presence of book entry in DB - populate DB earlier - and like status and respond
    response('no');
  },
}];
