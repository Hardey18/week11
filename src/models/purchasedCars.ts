import mongoose from 'mongoose';
import Joi from 'joi';
const Schema = mongoose.Schema;

const purchasedCarsSchema = new Schema({
    type: String,
    modelNumber: String,
    saleDate: String,
    buyer: String,
    color: String
});

function validatePurchasedCars(organ: any) {
    const schema = Joi.object({
        type: Joi.string().min(5).max(50).required(),
        modelNumber: Joi.array().items(Joi.string().min(5).max(50)).required(),
        saleDate: Joi.string().required(),
        buyer: Joi.string().required(),
        color: Joi.string().min(5).max(50).required()
    });
    return schema.validate(organ)
};


const PurchasedCars = mongoose.model('PurchasedCars', purchasedCarsSchema);

export { PurchasedCars, validatePurchasedCars };