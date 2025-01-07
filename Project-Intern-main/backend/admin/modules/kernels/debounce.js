module.exports = {
  debounce: (callback, wait) => {
    let timeoutId = null;
    return function (...args) {
      return new Promise((resolve) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          const result = await callback.apply(this, args);
          resolve(result);
        }, wait);
      });
    };
  },
};
