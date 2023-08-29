const mongoose = require("mongoose");

// const {
//   db: { host, port, name },
// } = require("../configs/config.mongodb");
// const connectString = `mongodb://${host}:${port}/${name}`;

const connectString =
  "mongodb+srv://AnhHV:EQNpnJc716BZxHE5@cluster0.3tn9em7.mongodb.net/?retryWrites=true&w=majority";
const { countConnect } = require("../helpers/check.connect");
class Database {
  constructor() {
    this.connect();
  }
  // connect
  connect(type = "mongodb") {
    // dev
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString)
      .then((_) => {
        console.log(`Connected MongoDb Success Pro`), countConnect();
      })
      .catch((err) => console.log(`Error Connect`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDb = Database.getInstance();

module.exports = instanceMongoDb;
