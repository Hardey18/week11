"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrganization = exports.Organization = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var joi_1 = __importDefault(require("joi"));
var Schema = mongoose_1.default.Schema;
var organizationSchema = new Schema({
    organization: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    products: [String],
    marketValue: String,
    address: String,
    ceo: String,
    country: String,
    noOfEmployees: Number,
    employees: [String]
});
function validateOrganization(organ) {
    var schema = joi_1.default.object({
        organization: joi_1.default.string().min(5).max(50).required(),
        products: joi_1.default.array().items(joi_1.default.string().min(5).max(50)).required(),
        marketValue: joi_1.default.string().min(2).max(50).required(),
        address: joi_1.default.string().min(5).max(255).required(),
        ceo: joi_1.default.string().min(5).max(255).required(),
        country: joi_1.default.string().min(5).max(255).required(),
        employees: joi_1.default.array().items(joi_1.default.string().min(5).max(50)).required()
    });
    return schema.validate(organ);
}
exports.validateOrganization = validateOrganization;
;
var Organization = mongoose_1.default.model('OrganizationSchema', organizationSchema);
exports.Organization = Organization;
