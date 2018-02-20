module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('books', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bookId: {
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return book;
};
