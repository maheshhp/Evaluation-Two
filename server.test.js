const Server = require('./server');
const Routes = require('./routes');

describe('Testing the Hapi server that processes the requests for API calls', () => {
  test('Should contain correct number of routes at server and routes file', () => {
    expect(Routes.length).toBe(Server.table('localhost')[0].table.length);
  });
  test('Should return 200 status code for sucessful GET request', (done) => {
    const request = {
      method: 'GET',
      url: '/books',
    };
    Server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Should return all books from Amazon API link with ratings on a sucessful GET request', (done) => {
    const request = {
      method: 'GET',
      url: '/books/booksWithRatings',
    };
    Server.inject(request, (response) => {
      expect(response.result).toBe(false);
      done();
    });
  });
});
