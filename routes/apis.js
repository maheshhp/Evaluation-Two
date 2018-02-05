module.exports = [{
  method: 'GET',
  path: '/books',
  handler: (request, response) => {
    response('Hello World');
  },
}];
