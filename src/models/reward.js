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
});

export default Reward;
