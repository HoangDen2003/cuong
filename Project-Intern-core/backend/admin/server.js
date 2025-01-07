const app = require("./index");

const port = 3000;

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
  console.log("Hello World !");
  console.log("Hãy đọc file README.md để biết cách sử dụng API");
});
