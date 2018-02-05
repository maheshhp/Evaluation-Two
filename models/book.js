module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('books', {
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    like: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return book;
};
