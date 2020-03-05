"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var connectedSchema = new mongoose_1.Schema({
    userName: { type: String, unique: true, required: true },
});
exports.default = mongoose_1.model('connected', connectedSchema);
