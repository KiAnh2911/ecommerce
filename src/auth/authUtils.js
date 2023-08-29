const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    //accessToken :  created from publicKey
    const accessToken = await JWT.sign(payload, publicKey, {
      // algorithm: "RS256",
      expiresIn: "1 days",
    });

    // refreshToken : created from privateKey
    const refreshToken = await JWT.sign(payload, privateKey, {
      // algorithm: "RS256",
      expiresIn: "7 days",
    });

    //

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error(`error verify`, err);
      } else {
        console.error(`decode verify`, decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {}
};

module.exports = { createTokenPair };
