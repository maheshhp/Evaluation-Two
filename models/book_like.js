'use strict';
module.exports = (sequelize, DataTypes) => {
  var book_like = sequelize.define('book_like', {
    book_id: DataTypes.INTEGER,
    like: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return book_like;
};