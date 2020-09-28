import mongoose from 'mongoose';
import Joi from 'joi';
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
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

function validateOrganization(organ: any) {
    const schema = Joi.object({
        organization: Joi.string().min(5).max(50).required(),
        products: Joi.array().items(Joi.string().min(5).max(50)).required(),
        marketValue: Joi.string().min(2).max(50).required(),
        address: Joi.string().min(5).max(255).required(),
        ceo: Joi.string().min(5).max(255).required(),
        country: Joi.string().min(5).max(255).required(),
        employees: Joi.array().items(Joi.string().min(5).max(50)).required()
    });
    return schema.validate(organ)
};


const Organization = mongoose.model('OrganizationSchema', organizationSchema);

export { Organization, validateOrganization };