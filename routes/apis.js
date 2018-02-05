const https = require('https');

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
    let apiTwoResponse = '';
    https.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (extApiResponse) => {
      extApiResponse.setEncoding('UTF8');
      extApiResponse.on('data', (data) => {
        apiOneResponse += data.toString();
      });
      extApiResponse.on('end', (end) => {
        apiOneResponse = JSON.parse(apiOneResponse);
        console.log(apiOneResponse);
      });
    });
    https.get('', (extApiResponse) => {
      extApiResponse.setEncoding('UTF8');
      extApiResponse.on('data', (data) => {
        apiTwoResponse += data.toString();
      });
      extApiResponse.on('end', (end) => {
        apiTwoResponse = JSON.parse(apiOneResponse);
        console.log(apiTwoResponse);
      });
    });
    response(false);
  },
}];
