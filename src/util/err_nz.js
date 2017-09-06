import Promise from "bluebird";

export default (err) => {
  return (n) => {
    if (n !== 0) {
      throw err;
    }

    return Promise.resolve(n);
  };
};
