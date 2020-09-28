"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStaffs = exports.Staffs = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var joi_1 = __importDefault(require("joi"));
var Schema = mongoose_1.default.Schema;
var staffSchema = new Schema({
    name: String,
    position: String,
    salary: Number,
    homeAddress: String,
});
function validateStaffs(organ) {
    var schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(50).required(),
        position: joi_1.default.string().min(5).max(50).required(),
        salary: joi_1.default.number().min(3).max(50).required(),
        homeAddress: joi_1.default.string().min(5).max(50).required()
    });
    return schema.validate(organ);
}
exports.validateStaffs = validateStaffs;
;
var Staffs = mongoose_1.default.model('Staffs', staffSchema);
exports.Staffs = Staffs;
