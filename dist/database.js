"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("./config/config");
var options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose_1.default.connect(config_1.config.MONGODB_URI, options);
var connection = mongoose_1.default.connection;
if (process.env.NODE_ENV === 'development') {
    connection.once('open', function (_) {
        console.log('db is connected');
    });
    connection.on('error', function (err) {
        console.log(err);
        process.exit(0);
    });
}
