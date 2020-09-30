import jwt from 'jsonwebtoken';
import { User } from '../models/users';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET!
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
    const token = jwt.sign(payload, secret, {
        expiresIn: '2h'
    })
    req.headers.authorization = token;
    return req;
}

export default auth;

// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// function auth(req: any) {
//   const token = req.headers["authorization"];
//   if (!token) {
//     throw new Error("Please login");
//   }

//   const secret = process.env.ACCESS_TOKEN_SECRET as string;
//   const decoded = jwt.verify(token, secret);
//   if (!decoded) throw new Error("Session expired");
  
//   req.userData = decoded;
// }

// export default auth;