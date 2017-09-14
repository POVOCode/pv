import DataTypes from "sequelize/lib/data-types";
import SQDB from "../sql_connection";

const Poll = SQDB.define("poll", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },

  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: SQDB.literal("NOW()"),
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: SQDB.literal("NOW()"),
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  n_products: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },

  products: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: null,
  },

  n_votes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },

  votes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: null,
  },

});

export default Poll;
