import mongoose from 'mongoose';
import Joi from 'joi';
const Schema = mongoose.Schema;

const allCarsSchema = new Schema({
    name: String,
    type: String,
    productionDate: String,
    color: [String],
    amount: Number,
    condition: String,
    price: Number
});

function validateAllCars(organ: any) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        type: Joi.string().min(5).max(50).required(),
        productionDate: Joi.string().min(5).max(50).required(),
        color: Joi.array().items(Joi.string().min(3).max(50)).required(),
        amount: Joi.number().min(1).max(50).required(),
        condition: Joi.string().min(5).max(50).required(),
        price: Joi.number().min(3).max(50).required(),
    });
    return schema.validate(organ)
};

const AllCars = mongoose.model('AllCars', allCarsSchema);

export { AllCars, validateAllCars };
