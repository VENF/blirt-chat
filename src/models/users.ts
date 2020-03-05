import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document{
    name: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    avatar: string
    comparePassword: (password: string) => Promise<Boolean> 
}

const userSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    avatar: { type: String, default: 'avatardeafult.jpg' }
});

userSchema.pre<IUser>('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }else{
        const Salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, Salt);
        this.password = hash;
        next();
    }
});

userSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
    return bcrypt.compare(password, this.password)
}
export default model<IUser>('user', userSchema);