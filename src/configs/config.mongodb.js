//  level 0
// const config = {
//   app: {
//     port: 3000,
//   },
//   db: {
//     host: "localhoost",
//     port: 27017,
//     name: 'db',
//   },
// };

// level 1
const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3030,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "shopDev",
  },
};

const pro = {
  app: {
    port: process.env.PRODUCT_APP_PORT || 3000,
  },
  db: {
    host: process.env.RODUCT_DB_HOST || "localhost",
    port: process.env.RODUCT_DB_PORT || 27017,
    name: process.env.RODUCT_DB_NAME || "shopDev",
  },
};

const env = process.env.NODE_ENV || "dev";
const config = { dev, pro };

module.exports = config[env];
