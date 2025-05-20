import { Router, Request, Response } from "express";
import { userMiddleware } from "../middlewares";
import { contentModel, linkModel,User } from "../models";
import { random } from "../utils";
import { Types } from "mongoose";

const shareRouter = Router();

interface User  {
    _id: Types.ObjectId;
    email: string;
    password: string;
}
interface CustomRequest extends Request {
    user?: User
}

shareRouter.post('/share', userMiddleware, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { share } = req.body;
        const hash = random(10); 
        if (share) {
            const existingLink = await linkModel.findOne({
                userId: req.user?._id
            })
            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                })
            }
            await linkModel.create({
                hash: hash,
                userId: req.user?._id
            })
            res.status(200).json({
            msg: "Share link set to true: "+ hash
        })
        }else {
                await linkModel.deleteOne({
                    userId: req.user?._id
                })
            res.status(200).json({
            msg: "Share link set to false/deleted"
        })
        }
        
    } catch (error) {
        console.log("Error:" + error),
            res.status(500).json({
            error
        })
    }
})

shareRouter.get('/:shareLink', async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const hash = req.params.shareLink;
        const link = await linkModel.findOne({
            hash: hash
        })
        if (!link) {
            res.status(411).json({
                msg: "Incorrect share link"
            })
            return;
        }
        const contents = await contentModel.find({
            userId: link.userId
        })
        const user = await User.findOne({
            _id: link.userId
        });
        res.status(200).json({
            user: user?.email,
            contents: contents
        })
        
    } catch (error) {
        
    }
    
})

   

export default shareRouter;