if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

import { Server } from './server'
import './database'
//initialize server
async function main(){
    const server = new Server(4000);
    server.listen();
}
main()