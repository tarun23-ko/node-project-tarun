const express = require('express')
const { registerUser, loginUSer, logout, forgetpassword } = require('../controller/userController')
const router = express.Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUSer)
router.route("/logout").get(logout)
router.route("/password/forget").post(forgetpassword)
module.exports = router  