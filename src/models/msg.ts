import {model, Schema,  Document} from 'mongoose'


const msgSchema = new Schema({
    message: { type: String },
    user: { type: String },
    img: { type: String, default: '' },
    avatar: { type: String, default: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' }
});

export default model('msg', msgSchema)