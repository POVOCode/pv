import Promise from "bluebird";

export default (err) => {
  return (n) => {
    if (!n) {
      throw err;
    }

    return Promise.resolve(n);
  };
};
