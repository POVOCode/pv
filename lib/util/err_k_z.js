const Promise = require("bluebird");

module.exports = (k, err) => {
  return (o) => {
    if (o[k] === 0) {
      throw err;
    }

    return Promise.resolve(o);
  };
};
