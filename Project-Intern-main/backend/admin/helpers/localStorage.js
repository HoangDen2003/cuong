const { LocalStorage } = require("node-localstorage");

module.exports = {
  setItem: (name, token) => {
    const localStorage = new LocalStorage("./scratch");
    localStorage.setItem(`${name}`, token);
  },
  getItem: () => {
    const localStorage = new LocalStorage("./scratch");
    const token = localStorage.getItem("token");
    return token;
  },
  removeItem: (name) => {
    const localStorage = new LocalStorage("./scratch");
    localStorage.removeItem(`${name}`);
  },
};
