import express from 'express';
import z from 'zod';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

export const signup = async (req: express.Request, res: express.Response) => {
    try {
        const reqUser = z.object({
            email: z.string().email().min(3).max(25),
            password: z.string().min(6).max(20).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[~!@#$%^&*()_+{}:"<>?]/)
        })
        const parsed = reqUser.safeParse(req.body);
        if(!parsed.success){
            res.status(400).json({
                message: "Invalid inputs",
                error: parsed.error
            });
        }

        const { email, password } = req.body;
        const  hashPass = await bcrypt.hash(password,8);

        await User.create({
            email,
            password: hashPass
        });
        res.status(200).json({
            message: "User created successfully"
        });



    } catch (error) {
        res.status(500).json({
            message: "User not created",
            error: error
        });
    }
}

// export const signin = async (req: express.Request, res: express.Response) => {
//     try {
        
//     } catch (e) {
//         res.status(500).json({
//             message: "Signin failed",
//             error: e
//         });
//     }
// }