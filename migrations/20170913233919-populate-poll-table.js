'use strict';

module.exports = {

  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn("polls", "title", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    queryInterface.addColumn("polls", "description", {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    queryInterface.addColumn("polls", "n_products", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    queryInterface.addColumn("polls", "products", {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
    });

    queryInterface.addColumn("polls", "n_votes", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    queryInterface.addColumn("polls", "votes", {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
    });
  },

  down: function (queryInterface) {
    queryInterface.removeColumn("polls", "title");
    queryInterface.removeColumn("polls", "description");
    queryInterface.removeColumn("polls", "n_products");
    queryInterface.removeColumn("polls", "products");
    queryInterface.removeColumn("polls", "n_votes");
    queryInterface.removeColumn("polls", "votes");
  }
};
