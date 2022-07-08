const express = require('express')
const { registerUser, loginUSer, logout, forgetpassword, resetpassword } = require('../controller/userController')
const router = express.Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUSer)
router.route("/logout").get(logout)
router.route("/password/forget").post(forgetpassword)
router.route("/password/reset/:token").put(resetpassword)
module.exports = router  