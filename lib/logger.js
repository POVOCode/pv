const W = require("winston");

const ConsoleOpts = {
  level: process.env.LOG_LEVEL || "debug",
  colorize: true,
  timestamp: Date.now,
  humanReadableUnhandledException: true,
  showLevel: true,
};

if (process.env.NODE_ENV === "production") {
  ConsoleOpts.depth = 0;
  ConsoleOpts.formatter = opts =>
    `${opts.timestamp()} - ${opts.level}: ${opts.message ? opts.message : ""}`;
}

const transports = [new (W.transports.Console)(ConsoleOpts)];

if (process.env.NODE_ENV === "production") {
  transports.push(new (W.transports.File)({
    level: "debug",
    timestamp: Date.now,

    filename: `${__dirname}/../logs/${new Date().toISOString()}.log`,
    maxSize: 1024 * 1024 * 10, // 10MB

    json: true,
    showLevel: true,
  }));
}

// TODO: Refactor and test the Logger
module.exports = new (W.Logger)({
  transports,
});
