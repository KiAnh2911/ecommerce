const mongoose = require("mongoose");

const connectString =
  "mongodb+srv://thangpq:VyqoH2HmeJnrlwMk@dummy.f5vwth4.mongodb.net/dummy	";

mongoose
  .connect(connectString)
  .then((_) => console.log(`Connected MongoDb Success`))
  .catch((err) => console.log(`Error Connect`));

// dev
if (1 === 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.require = mongoose;
