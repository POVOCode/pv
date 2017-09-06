import Promise from "bluebird";

export default (k, err) => {
  return (o) => {
    if (o[k] === 0) {
      throw err;
    }

    return Promise.resolve(o);
  };
};
