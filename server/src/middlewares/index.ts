// import express from 'express';
// import z from 'zod';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { User } from '../models';

// export const signup = async (req: express.Request, res: express.Response) => {
//     try {
//         const reqUser = z.object({
//             email: z.string().email().min(3).max(25),
//             password: z.string().min(6).max(20).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[~!@#$%^&*()_+{}:"<>?]/)
//         })
//         const parsed = reqUser.safeParse(req.body);
//         if(!parsed.success){
//             res.status(400).json({
//                 message: "Invalid inputs",
//                 error: parsed.error
//             });
//         }

//         const { email, password } = req.body;
//         const  hashPass = await bcrypt.hash(password,8);

//         await User.create({
//             email,
//             password: hashPass
//         });
//         res.status(200).json({
//             message: "User created successfully"
//         });



//     } catch (error) {
//         res.status(500).json({
//             message: "User not created",
//             error: error
//         });
//     }
// }

// export const signin = async (req: express.Request, res: express.Response) => {
//     try {
//         const reqUser = z.object({
//             email: z.string().email().min(3).max(25),
//             password: z.string().min(1)
//         });

//         const parsed = reqUser.safeParse(req.body);
//         if (!parsed.success) {
//             return res.status(400).json({
//                 message: "Invalid inputs",
//                 error: parsed.error
//             });
//         }

//         const { email, password } = req.body;
        
//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "Email and password are required",
//                 error: "Missing credentials"
//             });
//         }

//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }
//         const isValid = await bcrypt.compare(password, user.password);
//         if(!isValid){
//             return res.status(401).json({
//                 message: "Invalid password"
//             });
//         }
//         const token = jwt.sign({id: user._id
//         }, process.env.JWT_SEC as string, {expiresIn: '1h'});
//         return res.status(200).json({
//             message: "Signin successful",
//             token
//         });

//     } catch (error) {
//         console.error("Signin error:", error);
//         return res.status(500).json({
//             message: "Signin failed",
//             error: error instanceof Error ? error.message : "Unknown error occurred"
//         });
//     }
// }