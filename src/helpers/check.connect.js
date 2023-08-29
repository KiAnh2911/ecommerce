const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5000;
// count connect
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connection : ${numConnection}`);
};

// check overload

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    //expamle maxium number of connections based on number osf cores
    const maxConnections = numCores * 5;
    console.log(`Active connections : ${numConnection}`);
    console.log(`Memory usage : ${memoryUsage / 1024 / 1024} Mb`);

    if (numConnection > maxConnections) {
      console.log(`Connections overload detected`);
    }
  }, _SECONDS);
};

module.exports = { countConnect, checkOverload };
