import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import dotenv from 'dotenv';

dotenv.config();

async function auth (req: any) {
    const input = "nurudeen@gmail.com";
    
    const user = await User.findOne({ email: input });
    if (!user) {
        throw Error ("Authentication failed!")
    }
    const payload = {
        id: user.id,
        email: user["email"]
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })
    req.headers.authorization = token;
    return req;
}

export default auth;