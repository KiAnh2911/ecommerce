const app = require("./src/app");

const PORT = process.env.POST || 3000;

const server = app.listen(PORT, () => {
  console.log(`eCommerrce start with ${PORT} `);
});

// process.on("SIGINT", () => {
//   server.close(() => console.log(" Exit Server Express"));
// });
