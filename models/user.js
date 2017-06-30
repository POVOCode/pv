const SQDB = require("../lib/sql_connection");
const DataTypes = require("sequelize/lib/data-types");

const User = SQDB.define("user", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,

    validate: {
      notEmpty: true,
    },
  },

  email: {
    type: DataTypes.STRING,
  },

  password: {
    type: DataTypes.TEXT,
    allowNull: false,

    validate: {
      notEmpty: true,
    },
  },

  passwordSalt: {
    type: DataTypes.TEXT,
    allowNull: false,

    validate: {
      notEmpty: true,
    },
  },
});

module.exports = User;
