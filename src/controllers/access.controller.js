const { CREATED, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    const data = await AccessService.signUp(req.body);
    // return res.status(201).json(data);
    new CREATED({ message: "Resgitered Ok", metaData: data }).send(res);
  };

  signIn = async (req, res, next) => {
    new SuccessResponse({
      metaData: await AccessService.signIn(req.body),
    });
  };
}

module.exports = new AccessController();
