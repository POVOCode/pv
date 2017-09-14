'use strict';

module.exports = {

  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn("rewards", "label", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    queryInterface.addColumn("rewards", "brand", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    queryInterface.addColumn("rewards", "point_cost", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    queryInterface.addColumn("rewards", "description", {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    queryInterface.addColumn("rewards", "image_urls", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: null,
    });
  },

  down: function (queryInterface) {
    queryInterface.removeColumn("rewards", "label");
    queryInterface.removeColumn("rewards", "brand");
    queryInterface.removeColumn("rewards", "point_cost");
    queryInterface.removeColumn("rewards", "description");
    queryInterface.removeColumn("rewards", "image_urls");
  }
};
