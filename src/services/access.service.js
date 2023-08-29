const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { getInfoData } = require("../utils");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { BadRequestError } = require("../core/error.response");
const { findByEmail } = require("./shop.service");

const RolesShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
};

class AccessService {
  // signIn

  static signIn = async ({ email, password, refreshToken }) => {
    //  1 . check email in dbs
    const foundShop = findByEmail({ email });
    if (!foundShop) throw new BadRequestError("Shop not resgiterd");

    //  2 . match password
    const match = bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFailureError("Authentication error");

    //  3 . create access token and resfresh token
    const { publicKey, privateKey } = generateKeys();
    //  4 . generate tokens
    const userId = foundShop._id;
    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey,
      userId,
    });
    //  5 . get data  return login
    return {
      shop: getInfoData({
        fileds: ["_id", "name", "email"],
        object: foundShop,
      }),
      tokens,
    };
  };

  //  sign up
  static signUp = async ({ name, email, password }) => {
    // check email co1 ton tai hay chua
    const holderShop = await shopModel.findOne({ email }).lean();

    if (holderShop) {
      // return {
      //   code: "xxxx",
      //   message: "User already resgistered ",
      // };
      throw new BadRequestError("Shop already resgistered");
    }

    const passwordHashed = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHashed,
      roles: [RolesShop.SHOP],
    });

    if (newShop) {
      //created privateKey  , public key
      // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: "pkcs1", // public key crytography Standards 1
      //     format: "pem",
      //   },
      //   privateKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      // });

      const { publicKey, privateKey } = generateKeys();
      // const publicKeyString = await KeyTokenService.createKeyToken({
      //   userId: newShop._id,
      //   publicKey,
      // });

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        // return {
        //   code: "xxxx",
        //   message: "publicKeyString error",
        // };
        throw new BadRequestError("Shop was already registered");
      }

      //create token pair

      // const tokens = await createTokenPair(
      //   { userId: newShop._id, email },
      //   publicKeyObject,
      //   privateKey
      // );

      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      );
      console.log(`Created Token Success::`, tokens);

      // Lodash handling:
      return {
        shop: getInfoData({
          fields: ["_id", "name", "email"],
          object: newShop,
        }),
        tokens,
      };

      // return {
      //   code: 201,
      //   metaData: {
      //     shop: getInfoData({
      //       fileds: ["_id", "name", "email"],
      //       object: newShop,
      //     }),
      //     tokens,
      //   },
      // };
    }

    return {
      code: 200,
      metaData: null,
    };
  };
}

module.exports = AccessService;

function generateKeys() {
  const privateKey = crypto.randomBytes(64).toString("hex");
  const publicKey = crypto.randomBytes(64).toString("hex");
  return { publicKey, privateKey };
}
