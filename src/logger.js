import W from "winston";
import ENV from "./env";

const ConsoleOpts = {
  level: ENV.LOG_LEVEL || "debug",
  colorize: true,
  timestamp: Date.now,
  humanReadableUnhandledException: true,
  showLevel: true,
};

if (ENV.NODE_ENV === "production") {
  ConsoleOpts.depth = 0;
  ConsoleOpts.formatter = opts =>
    `${opts.timestamp()} - ${opts.level}: ${opts.message ? opts.message : ""}`;
}

const transports = [new (W.transports.Console)(ConsoleOpts)];

if (ENV.NODE_ENV === "production") {
  transports.push(new (W.transports.File)({
    level: "debug",
    timestamp: Date.now,

    filename: `${__dirname}/../logs/${new Date().toISOString()}.log`,
    maxSize: 1024 * 1024 * 10, // 10MB

    json: true,
    showLevel: true,
  }));
}

const logger = new (W.Logger)({
  transports,
});

export default logger;
