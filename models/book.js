module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    bookId: DataTypes.NUMBER,
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.NUMBER,
    like: DataTypes.NUMBER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return book;
};
