const https = require('https');

// params: callback - Function to be called once fetch from external API is
// complete and results are formatted
// returns: Calls callback function with required JSON format -
// {'author': [{author, bookId, name, rating}]}

const getExternalContent = (callback) => {
  let apiOneResponse = '';
  const newBookJson = {};
  https.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (extApiResponse) => {
    extApiResponse.setEncoding('UTF8');
    extApiResponse.on('data', (data) => {
      apiOneResponse += data.toString();
    });
    extApiResponse.on('end', () => {
      apiOneResponse = JSON.parse(apiOneResponse);
      const promiseArray = [];
      apiOneResponse.books.forEach((item) => {
        promiseArray.push(new Promise((resolve) => {
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
            secResponse.on('end', () => {
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
        callback(finalBookJson);
      });
    });
  });
};

module.exports = getExternalContent;
