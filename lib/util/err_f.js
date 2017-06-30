const Promise = require("bluebird");

module.exports = (err) => {
  return (n) => {
    if (!n) {
      throw err;
    }

    return Promise.resolve(n);
  };
};
