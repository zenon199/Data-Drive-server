import { Request, Response, Router } from 'express';
import z from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index';
const JWT_SEC = process.env.JWT_SEC || "TestSecret"

// if (!process.env.JWT_SEC) {
//     console.error("JWT_SEC environment variable is not set!");
//     process.exit(1);
// }

const userRouter = Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const reqUser = z.object({
            email: z.string().email().min(3).max(25),
            password: z.string().min(6).max(20).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[~!@#$%^&*()_+{}:"<>?]/)
        })
        const parsed = reqUser.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({
                message: "Invalid inputs",
                error: parsed.error
            });
        }

        const { email, password } = req.body;
        const hashPass = await bcrypt.hash(password, 8);

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
});

userRouter.post("/signin", async (req: Request, res: Response) => {
    try {
        const reqUser = z.object({
            email: z.string().email().min(3).max(25),
            password: z.string().min(1)
        });

        const parsed = reqUser.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({
                message: "Invalid inputs",
                error: parsed.error
            });
            return;
        }

        const { email, password } = req.body;
        
        if (!email || !password) {
            res.status(400).json({
                message: "Email and password are required",
                error: "Missing credentials"
            });
            return;
        }

        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            res.status(401).json({
                message: "Invalid password"
            });
            return;
        }
        
        const token = jwt.sign(
            {id: user._id},
            JWT_SEC as string,
            {expiresIn: '1h'}
        );
        
        res.status(200).json({
            message: "Signin successful",
            token,
            user: {
                "id": user._id,
                "email": user.email
            }
        });
        return;

    } catch (error) {
        res.status(500).json({
            message: "Signin failed",
            error: error instanceof Error ? error.message : "Unknown error occurred"
        });
        return;
    }
});

export default userRouter;