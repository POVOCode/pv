import DataTypes from "sequelize/lib/data-types";
import SQDB from "../sql_connection";

const Reward = SQDB.define("reward", {
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

  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  point_cost: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  image_urls: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: null,
  },

});

export default Reward;
