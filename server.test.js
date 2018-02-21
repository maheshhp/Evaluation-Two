const Server = require('./server');
const Routes = require('./routes');

const firstApiTestJson = {
  'J K Rowling': [
    {
      author: 'J K Rowling',
      id: 10,
      name: 'Harry Potter and the Sorcerers Stone (Harry Potter, #1)',
      rating: 4.45,
    },
    {
      author: 'J K Rowling',
      id: 20,
      name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)',
      rating: 4.38,
    },
    {
      author: 'J K Rowling',
      id: 30,
      name: 'Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)',
      rating: 4.54,
    },
    {
      author: 'J K Rowling',
      id: 40,
      name: 'Harry Potter and the Goblet of Fire (Harry Potter, #4)',
      rating: 4.53,
    },
    {
      author: 'J K Rowling',
      id: 50,
      name: 'Harry Potter and the Order of the Phoenix (Harry Potter, #5)',
      rating: 4.47,
    },
    {
      author: 'J K Rowling',
      id: 60,
      name: 'Harry Potter and the Half-Blood Prince (Harry Potter, #6)',
      rating: 4.54,
    },
    {
      author: 'J K Rowling',
      id: 70,
      name: 'Harry Potter and the Deathly Hallows (Harry Potter, #7)',
      rating: 4.62,
    },
  ],
  'Sidney Sheldon': [
    {
      author: 'Sidney Sheldon',
      id: 80,
      name: 'If Tomorrow Comes (Tracy Whitney Series, #1)',
      rating: 4.02,
    },
    {
      author: 'Sidney Sheldon',
      id: 100,
      name: 'Tell Me Your Dreams',
      rating: 3.93,
    },
    {
      author: 'Sidney Sheldon',
      id: 90,
      name: 'Master of the Game',
      rating: 4.1,
    },
    {
      author: 'Sidney Sheldon',
      id: 110,
      name: 'The Other Side of Midnight (Midnight #1)',
      rating: 3.9,
    },
    {
      author: 'Sidney Sheldon',
      id: 120,
      name: 'Rage of Angels',
      rating: 3.92,
    },
  ],
};

const booksWithLikes = {
  books: {
    'J K Rowling': [{
      author: 'J K Rowling', id: 20, like: 0, name: 'Harry Potter and the Chamber of Secrets (Harry Potter, #2)', rating: 4.38,
    }, {
      author: 'J K Rowling', id: 60, like: 0, name: 'Harry Potter and the Half-Blood Prince (Harry Potter, #6)', rating: 4.54,
    }, {
      author: 'J K Rowling', id: 50, like: 0, name: 'Harry Potter and the Order of the Phoenix (Harry Potter, #5)', rating: 4.47,
    }, {
      author: 'J K Rowling', id: 30, like: 0, name: 'Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)', rating: 4.54,
    }, {
      author: 'J K Rowling', id: 40, like: 0, name: 'Harry Potter and the Goblet of Fire (Harry Potter, #4)', rating: 4.53,
    }, {
      author: 'J K Rowling', id: 70, like: 0, name: 'Harry Potter and the Deathly Hallows (Harry Potter, #7)', rating: 4.62,
    }, {
      author: 'J K Rowling', id: 10, like: 1, name: 'Harry Potter and the Sorcerers Stone (Harry Potter, #1)', rating: 4.45,
    }],
    'Sidney Sheldon': [{
      author: 'Sidney Sheldon', id: 80, like: 0, name: 'If Tomorrow Comes (Tracy Whitney Series, #1)', rating: 4.02,
    }, {
      author: 'Sidney Sheldon', id: 100, like: 0, name: 'Tell Me Your Dreams', rating: 3.93,
    }, {
      author: 'Sidney Sheldon', id: 90, like: 0, name: 'Master of the Game', rating: 4.1,
    }, {
      author: 'Sidney Sheldon', id: 110, like: 0, name: 'The Other Side of Midnight (Midnight #1)', rating: 3.9,
    }, {
      author: 'Sidney Sheldon', id: 120, like: 0, name: 'Rage of Angels', rating: 3.92,
    }],
  },
  statusCode: 200,
};

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
      expect(response.result).toEqual(firstApiTestJson);
      done();
    });
  });
  test('Should populate database with book data', (done) => {
    Server.inject({ method: 'GET', url: '/books/populateBookDetails' }, (res) => {
      expect(res.result.statusCode).toBe(201);
      done();
    });
  });
  test('Should make the like status of book with ID = 1 as true', (done) => {
    const request = {
      method: 'POST',
      url: '/books/booksRating',
      payload: JSON.stringify({ bookId: 10, like: 'yes' }),
    };
    Server.inject(request, (response) => {
      expect(response.result.likeStatus).toMatch('yes');
      done();
    });
  });
  test('Should return like status of book with ID = 21 as undefined', (done) => {
    const request = {
      method: 'POST',
      url: '/books/booksRating',
      payload: JSON.stringify({ bookId: 21, like: 'yes' }),
    };
    Server.inject(request, (response) => {
      expect(response.result).toEqual({
        likeStatus: 'No book found',
        responseCode: 404,
      });
      done();
    });
  });
  test('Should return like status and details of books grouped by author', (done) => {
    const request = {
      method: 'GET',
      url: '/books/byAuthor',
    };
    Server.inject(request, (response) => {
      console.log(response.result);
      expect(response.result).toEqual(booksWithLikes);
      done();
    });
  });
});
