import { Schema, model, Document } from 'mongoose'

export interface IConnected  extends Document{
    userName: string,
}

const connectedSchema = new Schema({
    userName: { type: String, unique: true, required: true },
});

export default model<IConnected>('connected', connectedSchema);