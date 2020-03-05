import mongoose, { ConnectionOptions } from 'mongoose'
import { config } from './config/config'

const options: ConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(config.MONGODB_URI, options);

const connection = mongoose.connection;

if(process.env.NODE_ENV === 'development'){
    connection.once('open', _=> {
        console.log('db is connected')
    });
    connection.on('error', err => {
        console.log(err)
        process.exit(0)
    })
}