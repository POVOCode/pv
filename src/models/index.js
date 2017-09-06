import FS from "fs";
import Path from "path";
import SQDB from "../sql_connection";

const basename = Path.basename(module.filename);
const db = {};

FS
  .readdirSync(__dirname)
  .filter(file => (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js"))
  .forEach((file) => {
    const model = SQDB.import(Path.join(__dirname, file));

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// TODO: ?? Why did I do this? Investigate...
db.sequelize = SQDB;
db.Sequelize = SQDB;

export default db;
