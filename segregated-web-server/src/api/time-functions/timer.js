const waitFunc = (timer) => {
  return new Promise((res) => {
    setTimeout(() => {
      res("Complete");
    }, timer);
  });
};

const recallFunc = (timer) => {
  return new Promise(() => {
    setTimeout(() => {}, timer);
  });
};

module.exports = {
  waitFunc,
  recallFunc,
};
