module.exports = (sequelize, DataTypes) => {
  const book_like = sequelize.define('book_like', {
    book_id: DataTypes.INTEGER,
    like: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return book_like;
};
