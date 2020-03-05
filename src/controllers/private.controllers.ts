import User, { IUser } from '../models/users'
import { Request, Response } from 'express'
import Msg from '../models/msg'

export const home = async (req: Request, res: Response): Promise<Response> => {
    try {
        return res.json({
            auth: true,
            user: req.user,
        })
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}

export const updateAvatar = async (req: Request, res: Response): Promise<Response> => {
    const userName = req.params.userName;
    const avatar = req.file.path;
    try {
        const user = User.findOne({ userName: userName });
        if(!user){
            return res.status(404).json({
                msg: 'user not found'
            })
        }else{
            await user.update({ avatar: avatar });
            const userUpdated = User.findOne({ userName: userName }, { password: 0 });
            return res.status(200).json({
                msg: 'operation successfully',
                userUpdated
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}

export const messages = async (req: Request, res: Response): Promise<Response> => {
    try {
        const messages = await Msg.find({});
        return res.status(200).json({
            messages
        })
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}