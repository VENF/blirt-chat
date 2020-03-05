"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = __importDefault(require("../models/users"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config/config");
var bcrypt_1 = __importDefault(require("bcrypt"));
exports.signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                if (!(!req.body.name || !req.body.lastName || !req.body.userName || !req.body.email || !req.body.password)) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).json({
                        msg: 'Please send all fields'
                    })];
            case 1: return [4 /*yield*/, users_1.default.findOne({ email: req.body.email })];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                return [2 /*return*/, res.status(400).json({
                        msg: 'This email already exist'
                    })];
            case 3:
                newUser = new users_1.default(req.body);
                newUser.userName = '@' + newUser.userName;
                return [4 /*yield*/, newUser.save()];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        msg: 'user has been created successfully'
                    })];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        error: error_1
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, validatePassword, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                if (!(!req.body.userName || !req.body.password)) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).json({
                        msg: 'Please send all fields'
                    })];
            case 1: return [4 /*yield*/, users_1.default.findOne({ userName: req.body.userName })];
            case 2:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 3];
                return [2 /*return*/, res.status(401).json({
                        msg: 'user not found, remember to use @'
                    })];
            case 3: return [4 /*yield*/, user.comparePassword(req.body.password)];
            case 4:
                validatePassword = _a.sent();
                if (!validatePassword) {
                    return [2 /*return*/, res.status(401).json({
                            msg: 'invalid password'
                        })];
                }
                else {
                    return [2 /*return*/, res.status(200).json({
                            auth: true,
                            token: jsonwebtoken_1.default.sign({ id: user._id }, config_1.config.JWT_KEY, { expiresIn: 60 * 60 * 24 }),
                        })];
                }
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        error: error_2
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userUpdated, Salt, _a, userUpdated, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 12, , 13]);
                if (!!req.body) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).json({
                        msg: 'you must fill in the fields to update'
                    })];
            case 1: return [4 /*yield*/, users_1.default.findOne({ userName: req.params.userName })];
            case 2:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 3];
                return [2 /*return*/, res.status(404).json({
                        msg: 'user not found'
                    })];
            case 3:
                if (!!req.body.password) return [3 /*break*/, 6];
                return [4 /*yield*/, user.updateOne(req.body)];
            case 4:
                _b.sent();
                return [4 /*yield*/, users_1.default.findOne({ userName: req.params.userName }, { password: 0 })];
            case 5:
                userUpdated = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        msg: 'user has been updated successfully',
                        userUpdated: userUpdated
                    })];
            case 6: return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 7:
                Salt = _b.sent();
                _a = req.body;
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, Salt)];
            case 8:
                _a.password = _b.sent();
                return [4 /*yield*/, user.updateOne(req.body)];
            case 9:
                _b.sent();
                return [4 /*yield*/, users_1.default.findOne({ userName: req.params.userName }, { password: 0 })];
            case 10:
                userUpdated = _b.sent();
                return [2 /*return*/, res.json({
                        msg: 'user has been updated successfully',
                        userUpdated: userUpdated
                    })];
            case 11: return [3 /*break*/, 13];
            case 12:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(500).json({
                        error: error_3
                    })];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteUser_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!!req.params.userName) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).json({
                        msg: 'Ups'
                    })];
            case 1: return [4 /*yield*/, users_1.default.findOneAndDelete({ userName: req.params.userName })];
            case 2:
                deleteUser_1 = _a.sent();
                if (!deleteUser_1) {
                    return [2 /*return*/, res.status(404).json({
                            msg: 'this user not found'
                        })];
                }
                else {
                    return [2 /*return*/, res.status(200).json({
                            msg: 'this user has been delete successfully'
                        })];
                }
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        error: error_4
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
