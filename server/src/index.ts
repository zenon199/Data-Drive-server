import express, { Application, Request, Response } from "express";
import z from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from './db';

const app : Application = express();
app.use(express.json());

app.post("/api/v1/signup", async (req: Request,res: Response) => {
    try {
        const requireUser = z.object({
            name: z.string().min(3).max(10),
            email: z.string().email().min(3).max(30),
            password: z.string().min(8).max(20).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[~!@#$%^&*()_+{}:"<>?]/)
        });
        const successParsed = requireUser.safeParse(req.body);

        if (!successParsed.success) {
            return res.status(411).json({
                message: "Error in inputs",
                error: successParsed.error.errors,
            })
        }
        const { name, email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(403).json({
                message: "User already exists"
            })
        }

        const hashPass = await bcrypt.hash(password, 5);

        await userModel.create({
            name: name,
            email: email,
            password: hashPass
        })
        res.status(200).json({
            message: "User registered Successfully"
        })
    } catch (e) {
        res.status(500).json({
            message: "server error",
            error: e
        })
    }   
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const validUser = await userModel.findOne({ email });
        if (!validUser) {
            return res.status(403).json({
                message: "User does not exist"
            })
        }

        const matchPassword = await bcrypt.compare(password, validUser.password);
        if (!matchPassword) {
            return res.status(403).json({
                message: "Password is incorrect"
            })
        }

        if (!process.env.JWT_Sec) {
            return res.status(500).json({
                message: "JWT Secret not defined"
            })
        }

        const token = jwt.sign({ id: validUser._id.toString() }, process.env.JWT_Sec as string,
            { expiresIn: '10d' });
        
        res.status(200).json({
            message: `Welcome back ${validUser.name}`,
            token,
            validUser
        })
    } catch (e) {
        res.status(500).json({
            message: "Internal Server error",
            error: e
        })
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});