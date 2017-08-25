module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      passwordSalt: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.literal("FALSE"),
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable("Users");
  },
};
