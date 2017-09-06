const SQDB = require("../lib/sql_connection");
const DataTypes = require("sequelize/lib/data-types");
const hashPassword = require("../lib/util/hash_password");

const User = SQDB.define("user", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: SQDB.literal("NOW()"),
  },

  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: SQDB.literal("NOW()"),
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
    allowNull: false,
    unique: true,

    validate: {
      notEmpty: true,
    },
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

  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: SQDB.literal("FALSE"),

    validate: {
      notEmpty: true,
    },
  },

  postcode: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },

  interests: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "",
  },

  inMailingList: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: SQDB.literal("FALSE"),
  }
});

/**
 * Hashes the provided cleartext password securely, and passes the hash result
 * and salt to the returned promise chain.
 *
 * @param {String} cleartext password to hash
 * @return {Promise} p resolves to a hash w/ password + salt keys
 */
User.hashPassword = function (cleartext) {
  return new Promise((resolve, reject) => {
    hashPassword(cleartext, (err, password, salt) => {
      if (err) return reject(err);

      return resolve({
        password,
        salt,
      });
    });
  });
};

module.exports = User;
