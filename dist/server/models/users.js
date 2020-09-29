"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateUser = exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var joi_1 = __importDefault(require("joi"));
var userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});
function validateUser(organ) {
    var schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(50).required(),
        email: joi_1.default.string().min(5).max(50).required(),
        password: joi_1.default.string().min(5).max(255).required()
    });
    return schema.validate(organ);
}
exports.validateUser = validateUser;
;
function validateLogin(organ) {
    var schema = joi_1.default.object({
        email: joi_1.default.string().min(5).max(50).required(),
        password: joi_1.default.string().min(5).max(255).required()
    });
    return schema.validate(organ);
}
exports.validateLogin = validateLogin;
;
var User = mongoose_1.default.model('User', userSchema);
exports.User = User;
