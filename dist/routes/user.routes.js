"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var router = express_1.Router();
router.post('/signup', user_controller_1.signup);
router.post('/signin', user_controller_1.signin);
exports.default = router;
