module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    bookId: {
      allowNull: false,
      autoIncrement: false,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.INTEGER,
    },
    like: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('books'),
};
