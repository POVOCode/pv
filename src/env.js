import Dotenv from "dotenv";
import FS from "fs";

const { NODE_ENV } = process.env;

if ((NODE_ENV || "").length > 0) {
  const envFilePath = `${__dirname}/../env/${NODE_ENV}`;

  if (FS.existsSync(envFilePath)) {
    Dotenv.config({
      path: envFilePath,
    });

    console.log(`Loaded env from ${envFilePath}`);
  }
}

export default process.env;
