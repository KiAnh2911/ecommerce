const { Router } = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");

const router = Router();

//sign up
router.post("/shop/sign-up", asyncHandler(accessController.signUp));

//sign in
router.get("/shop/sign-in", asyncHandler(accessController.signIn));

module.exports = router;
