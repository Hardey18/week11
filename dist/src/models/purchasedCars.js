"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePurchasedCars = exports.PurchasedCars = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var joi_1 = __importDefault(require("joi"));
var Schema = mongoose_1.default.Schema;
var purchasedCarsSchema = new Schema({
    type: String,
    modelNumber: String,
    saleDate: String,
    buyer: String,
    color: String
});
function validatePurchasedCars(organ) {
    var schema = joi_1.default.object({
        type: joi_1.default.string().min(5).max(50).required(),
        modelNumber: joi_1.default.array().items(joi_1.default.string().min(5).max(50)).required(),
        saleDate: joi_1.default.string().required(),
        buyer: joi_1.default.string().required(),
        color: joi_1.default.string().min(5).max(50).required()
    });
    return schema.validate(organ);
}
exports.validatePurchasedCars = validatePurchasedCars;
;
var PurchasedCars = mongoose_1.default.model('PurchasedCars', purchasedCarsSchema);
exports.PurchasedCars = PurchasedCars;
