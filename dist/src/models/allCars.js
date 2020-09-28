"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAllCars = exports.AllCars = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var joi_1 = __importDefault(require("joi"));
var Schema = mongoose_1.default.Schema;
var allCarsSchema = new Schema({
    name: String,
    type: String,
    productionDate: String,
    color: [String],
    amount: Number,
    condition: String,
    price: Number
});
function validateAllCars(organ) {
    var schema = joi_1.default.object({
        name: joi_1.default.string().min(5).max(50).required(),
        type: joi_1.default.string().min(5).max(50).required(),
        productionDate: joi_1.default.string().min(5).max(50).required(),
        color: joi_1.default.array().items(joi_1.default.string().min(3).max(50)).required(),
        amount: joi_1.default.number().min(1).max(50).required(),
        condition: joi_1.default.string().min(5).max(50).required(),
        price: joi_1.default.number().min(3).max(50).required(),
    });
    return schema.validate(organ);
}
exports.validateAllCars = validateAllCars;
;
var AllCars = mongoose_1.default.model('AllCars', allCarsSchema);
exports.AllCars = AllCars;
