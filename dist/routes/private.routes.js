"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var private_controllers_1 = require("../controllers/private.controllers");
var user_controller_1 = require("../controllers/user.controller");
var multer_1 = __importDefault(require("../libs/multer"));
var passport_1 = __importDefault(require("passport"));
var router = express_1.Router();
router.get('/home', passport_1.default.authenticate('jwt', { session: false }), private_controllers_1.home);
router.put('/avatar/:userName', passport_1.default.authenticate('jwt', { session: false }), multer_1.default.single('avatar'), private_controllers_1.updateAvatar);
router.put('/user/:userName', passport_1.default.authenticate('jwt', { session: false }), user_controller_1.updateUser);
router.delete('/user/:userName', passport_1.default.authenticate('jwt', { session: false }), user_controller_1.deleteUser);
router.get('/messages', passport_1.default.authenticate('jwt', { session: false }), private_controllers_1.messages);
exports.default = router;
