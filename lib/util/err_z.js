const Promise = require("bluebird");

module.exports = (err) => {
  return (n) => {
    if (n === 0) {
      throw err;
    }

    return Promise.resolve(n);
  };
};
