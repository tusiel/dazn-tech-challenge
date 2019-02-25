const app = require("./app");
const config = require("./config");

app.listen(config.PORT, () => {
  console.log(`Your node js server is running on PORT: ${config.PORT}`);
});
