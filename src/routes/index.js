const { Router } = require("express");
const { apiKey, permission } = require("../auth/checkAuth");

const router = Router();

//check apiKey
router.use(apiKey);
//check premissions
router.use(permission("0000"));

router.use("/v1/api", require("./access"));

module.exports = router;
