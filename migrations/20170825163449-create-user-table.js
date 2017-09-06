module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
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

      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,

        validate: {
          notEmpty: true,
        },
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

        validate: {
          notEmpty: true,
        },
      },

      password: {
        type: Sequelize.TEXT,
        allowNull: false,

        validate: {
          notEmpty: true,
        },
      },

      passwordSalt: {
        type: Sequelize.TEXT,
        allowNull: false,

        validate: {
          notEmpty: true,
        },
      },

      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: Sequelize.literal("FALSE"),

        validate: {
          notEmpty: true,
        },
      },

      postcode: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },

      interests: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "",
      },

      inMailingList: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: Sequelize.literal("FALSE"),
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable("users");
  },
};
