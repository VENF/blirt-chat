"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var msgSchema = new mongoose_1.Schema({
    message: { type: String },
    user: { type: String },
    img: { type: String, default: '' },
    avatar: { type: String, default: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' }
});
exports.default = mongoose_1.model('msg', msgSchema);
