module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    bookId: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: sequelize.INTEGER,
    like: sequelize.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return book;
};
