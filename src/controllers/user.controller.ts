import User, { IUser } from '../models/users'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import bcrypt from 'bcrypt'

export const signup = async (req: Request, res: Response): Promise<Response> => {
    try {
        if(!req.body.name || !req.body.lastName || !req.body.userName || !req.body.email || !req.body.password){
            return res.status(400).json({
                msg: 'Please send all fields'
            });
        }else{
            const user = await User.findOne({ email: req.body.email });
            if(user){
                return res.status(400).json({
                    msg: 'This email already exist'
                });
            }else{
                const newUser: IUser = new User(req.body);
                newUser.userName = '@' + newUser.userName;
                await newUser.save();
                return res.status(200).json({
                    msg: 'user has been created successfully'
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}
export const signin = async (req: Request, res: Response): Promise<Response> => {
    try {
        if(!req.body.userName || !req.body.password){
            return res.status(400).json({
                msg: 'Please send all fields'
            });
        }else{
            const user = await User.findOne({ userName: req.body.userName });
            if(!user){
                return res.status(401).json({
                    msg: 'user not found, remember to use @'
                });
            }else{
                const validatePassword = await user.comparePassword(req.body.password);
                if(!validatePassword){
                    return res.status(401).json({
                        msg: 'invalid password'
                    });
                }else{
                    return res.status(200).json({
                        auth: true,
                        token: jwt.sign({ id: user._id }, config.JWT_KEY, { expiresIn: 60 * 60 * 24 }),
                    });
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        if(!req.body){
            return res.status(400).json({
                msg: 'you must fill in the fields to update'
            });
        }else{
            const user = await User.findOne({ userName: req.params.userName });
            if(!user){
                return res.status(404).json({
                    msg: 'user not found'
                });
            }else{
                if(!req.body.password){
                    await user.updateOne(req.body);
                    const userUpdated = await User.findOne({ userName: req.params.userName }, {password: 0});
                    return res.status(200).json({
                        msg: 'user has been updated successfully',
                        userUpdated
                    });
                }else{
                    const Salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, Salt);
                    await user.updateOne(req.body);
                    const userUpdated = await User.findOne({ userName: req.params.userName }, {password: 0});
                    return res.json({
                        msg: 'user has been updated successfully',
                        userUpdated
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        if(!req.params.userName){
            return res.status(400).json({
                msg: 'Ups'
            });
        }else{
            const deleteUser = await User.findOneAndDelete({ userName: req.params.userName });
            if(!deleteUser){
                return res.status(404).json({
                    msg: 'this user not found'
                })
            }else{
                return res.status(200).json({
                    msg: 'this user has been delete successfully'
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}