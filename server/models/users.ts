import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'config'

const userSchema = new mongoose.Schema({
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
})

function validateUser(organ: any) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(organ)
};

const User = mongoose.model('User', userSchema);

export { User, validateUser }
